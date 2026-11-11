# 一次“自动登录后被踢回登录界面”的完整排查：当 getty 抢走了 X 的 VT7

注：本文是AI专家（DeepSeek V4.1 Flash Free, OpenCode）解决问题后撰写的. 我选用方案 A：屏蔽 getty@tty7解决了问题，实现linux桌面无密码直接登录。PRETTY_NAME="Ubuntu 24.04 LTS"。


> 本文记录一次真实的 Linux 桌面故障诊断。系统是 Ubuntu 24.04 + LightDM + XFCE。用户的现象是：开机后无密码进入桌面，约一分钟后屏幕右上角出现通知，随后又回到登录界面。本文只做诊断，未实际修改系统。

---

## 一、现象

用户的描述很具体：

1. 从关机状态开机；
2. 没有输入密码就进入了桌面；
3. 大约一分钟后，右上角出现一些通知；
4. 然后桌面消失，回到登录界面；
5. 每次开机都这样。

表面看像是“自动登录没有彻底生效”，但“进入桌面后又回到登录界面”这个动作，说明问题不是登录没成功，而是**登录成功之后，图形会话被某种力量拆掉了**。

---

## 二、第一反应：先排除最明显的可能

我先检查了显示管理器和自动登录配置：

```bash
systemctl status display-manager
cat /etc/lightdm/lightdm.conf
loginctl list-sessions
```

结果：

```ini
[Seat:*]
autologin-user=hhy06
autologin-user-timeout=0
user-session=xfce
```

配置本身没有问题。日志也证明自动登录确实成功了：

```text
09:14:02 lightdm[1991]: pam_unix(lightdm-autologin:session):
          session opened for user hhy06(uid=1000)
09:14:02 systemd-logind: New session c1 of user hhy06.
```

所以第一步结论是：**autologin 已经生效，问题发生在进入桌面之后。**

---

## 三、把时间线拼出来

接着我查了本次开机的完整日志：

```bash
journalctl -b --since "09:13:50" --until "09:15:10"
loginctl session-status c1
loginctl session-status c3
```

时间线非常清晰：

| 时间 | 事件 |
|---|---|
| 09:14:00 | LightDM 启动，X 使用 VT7 |
| 09:14:02 | 自动登录成功，session c1 建立 |
| 09:14:55 | `getty@tty7.service` 启动 |
| 09:14:56 | `X connection to :0 broken`，自动登录会话 c1 关闭 |
| 09:14:58 | greeter 会话 c2 启动，出现登录界面 |
| 09:15:00 | 普通 `pam_unix(lightdm:session)` 登录，session c3 建立 |

这里有两个关键点：

1. **c1 是 `lightdm-autologin` 会话，c3 是普通 `lightdm` 会话。** 第二次进入桌面不是 autologin 再次生效，而是 greeter 发起的正常认证流程。这就是用户感觉“无密码登录不彻底”的直接原因。
2. **X 断开和 `getty@tty7` 启动只差约 1 秒。**

这不是巧合，而是需要重点验证的相关性。

---

## 四、多 boot 对比：相关性变成规律

单次日志只能说明“同时发生”，不能说明因果。于是我对比了之前几次开机：

```bash
journalctl --list-boots
for off in 0 -1 -2 -3 -4; do
  journalctl -b $off | grep -E \
    'getty@tty7|lightdm-autologin.*session closed|X connection to :0 broken'
done
```

结果非常一致：

| 开机 | 自动登录 → 会话关闭 | getty@tty7 启动 → X 断开 |
|---|---|---|
| boot 0 | 约 54 秒 | 约 1 秒 |
| boot -1 | 约 1 秒 | 约 0.1 秒 |
| boot -2 | 约 3 秒 | 约 0.1 秒 |
| boot -3 | 约 17 秒 | 约 1.3 秒 |
| boot -4 | 约 31 秒 | 约 1.3 秒 |

**每一次都是 `getty@tty7` 启动后极短时间内 X 断开。** 自动登录能活多久，取决于 `getty@tty7` 多晚启动。

这基本可以锁定方向了。

---

## 五、X 不是崩溃，而是被“正常终止”

`/var/log/Xorg.0.log.old` 正好保存了崩溃前那次 X 的日志，而且它可读：

```bash
tail -120 /var/log/Xorg.0.log.old
```

关键内容：

```text
(++) using VT number 7

[67.304] (WW) xf86CloseConsole: KDSETMODE failed: Input/output error
[67.304] (WW) xf86CloseConsole: VT_GETMODE failed: Input/output error
[67.304] (II) Server terminated successfully (0). Closing log file.
```

这三行非常重要：

- `using VT number 7`：X 用的是 VT7；
- `KDSETMODE failed` / `VT_GETMODE failed: Input/output error`：X 已经无法控制这个 VT，说明 VT 被别的进程拿走了；
- `Server terminated successfully (0)`：X 不是段错误崩溃，而是收到了正常终止信号后退出。

也就是说，**不是显卡驱动崩了，也不是 XFCE 自己退出了，而是有人抢走了 X 的 VT，X 随后被正常终止。**

---

## 六、真正的冲突：getty@tty7 与 LightDM 同抢 VT7

继续检查 unit 关系：

```bash
systemctl show lightdm.service -p Conflicts -p After -p Before
systemctl show getty@tty7.service -p WantedBy -p After -p Before
systemctl status getty@tty7
```

发现：

```text
lightdm.service:
  Conflicts=getty@tty7.service plymouth-quit.service
  After=... getty@tty7.service ...
```

同时：

```text
getty@tty7.service:
  WantedBy=
```

`getty.target` 只 wants `getty@tty1.service`，并没有静态启用 tty7。也就是说，`getty@tty7` 是一个在启动过程中被动态实例化的 getty，而它和 LightDM 的 X 落在了同一个 VT7 上。

更微妙的是系统启动顺序：

- `lightdm.service` 的 `After=getty@tty7.service` 只有在 `getty@tty7` 已经进入同一个启动事务时才有效；
- 这次开机中，LightDM 早在 09:14:00 就启动了；
- `getty@tty7` 直到 09:14:55 才启动。

于是出现了一个典型的“延迟冲突”：

1. LightDM 先占用 VT7，X 正常工作；
2. 自动登录成功，用户已经看到桌面；
3. 几十秒后 `getty@tty7` 才被拉起；
4. getty 和 X 抢同一个 VT；
5. X 失去 VT 控制权，被正常终止；
6. LightDM 检测到会话结束，回到 greeter。

`Conflicts=` 并不是“永不共存”的魔法，它依赖 systemd 的 job 顺序。**一个晚到的冲突单元，完全可能拆掉一个已经运行很久的会话。**

---

## 七、为什么这次要等约一分钟？

关键在启动链：

```text
NetworkManager-wait-online.service  耗时约 55 秒
        ↓
network-online.target
        ↓
rc-local.service
        ↓
plymouth-quit-wait.service
        ↓
setvtrgb.service
        ↓
getty@tty7.service
```

本次开机 `NetworkManager-wait-online` 花了约 55 秒，`getty@tty7` 又被排在 `rc-local`、`plymouth-quit-wait` 之后，所以直到 09:14:55 才启动。

而 `/etc/rc.local` 里还有一批启动脚本：

```sh
nohup cpolar start-all &
nohup python3 .../ntfy_post_ip.py &
nohup python3 .../out.py &
nohup python3 ~/x11vnc.py &
nohup quiterss &
```

这些脚本不是直接杀手，但它们参与的启动顺序，把 `getty@tty7` 推迟到了 LightDM 之后。

至于用户看到的“右上角通知”，其实是同一时间网络上线、各种桌面服务启动时产生的通知，是**伴随现象，不是原因**。真正的原因是同一时刻 `getty@tty7` 抢走了 VT7。

---

## 八、根因总结

一句话：

> **自动登录成功之后，延迟启动的 `getty@tty7` 与 LightDM 的 X 争用 VT7，导致 X 被正常终止，LightDM 退回登录界面。**

拆开说：

1. `/etc/lightdm/lightdm.conf` 的 autologin 配置没有问题；
2. `getty@tty7` 不是静态启用的，而是启动过程中动态实例化的；
3. `lightdm.service` 虽然有 `Conflicts=getty@tty7.service` 和 `After=getty@tty7.service`，但 `getty@tty7` 启动得太晚；
4. X 使用 VT7，getty 也落在 VT7；
5. X 失去 VT 后被正常终止，会话结束，greeter 出现；
6. 第二次进入桌面是普通 PAM 登录，不是 autologin，所以看起来“无密码登录不彻底”。

---

## 九、修复思路

如果后续要修复，可以考虑以下方向（本次未执行）：

### 方案 A：屏蔽 getty@tty7（最直接）

```bash
sudo systemctl mask getty@tty7.service
```

适用于确认 tty7 不需要文本登录的情况。注意：`getty@tty7` 当前 `WantedBy=` 为空，`disable` 未必有效，`mask` 更可靠。

### 方案 B：调整启动顺序

让 `getty@tty7` 在 LightDM 之前完成，或者避免 `rc-local`/`network-online` 把它延迟到图形会话之后。这个方案更“治本”，但需要仔细检查 `getty@.service`、`rc-local.service` 的依赖关系，改动面更大。

### 方案 C：去掉 `vt.handoff=7`

`vt.handoff=7` 与 VT7 的使用有关，但它也影响开机画面和显示管理器行为，不建议作为首选。

无论选哪种，验证方法都一样：

```bash
systemctl status getty@tty7
loginctl list-sessions
journalctl -b | grep -E 'getty@tty7|X connection|lightdm-autologin'
```

确认自动登录会话能稳定存活，且不再出现 greeter 顶替。

---

## 十、这次排查带来的几个知识点

### 1. “自动登录成功”不等于“自动登录完成”

autologin 只负责建立初始会话。会话建立后，任何 VT 冲突、X 重启、session 终止，都会把用户送回 greeter。排查时要把“认证成功”和“会话存活”分开看。

### 2. `Conflicts=` 的生效依赖启动顺序

systemd 的 `Conflicts=` 不是静态防火墙。一个单元如果在另一个单元之后才启动，冲突会在运行时爆发。**延迟启动的冲突单元，比同时启动的冲突更危险。**

### 3. `After=` 只对同一事务中的 job 有效

`lightdm.service` 虽然写了 `After=getty@tty7.service`，但如果 `getty@tty7` 的启动 job 在 LightDM 启动时还没进入事务，这个顺序约束就不会保护已经运行的 X。

### 4. Xorg 的“正常终止”也是重要线索

`Server terminated successfully (0)` 看起来像好消息，实际上说明 X 是被正常信号终止的。配合 `KDSETMODE failed` / `VT_GETMODE failed`，可以判断是 VT 被抢走，而不是显卡崩溃。

### 5. 多 boot 对比是排除偶然性的利器

单次日志只能给出相关性。把 5 次开机的“autologin 关闭时间”和“getty 启动时间”放在一起，规律立刻显现：**getty 启动后 0.1～1.3 秒，X 必断。**

### 6. 不要被“通知”带偏

用户看到的通知出现在同一时间点，很容易让人以为是某个通知程序导致注销。实际上它只是 `network-online` 之后大量服务启动的伴随现象。排障时要区分“时间相关”和“因果相关”。

### 7. 动态实例化单元要用 `mask`，不是 `disable`

`getty@tty7.service` 的 `WantedBy=` 为空，说明它不是通过静态 symlink 启用的。对这类单元，`systemctl disable` 往往没有效果，`systemctl mask` 才能可靠阻止启动。

---

## 十一、复盘命令清单

```bash
# 显示管理器与自动登录
systemctl status display-manager
cat /etc/lightdm/lightdm.conf

# 当前会话
loginctl list-sessions
loginctl session-status c1
loginctl session-status c3

# 本次开机关键日志
journalctl -b --since "09:13:50" --until "09:15:10"

# 多 boot 对比
journalctl --list-boots

# X 退出原因
tail -120 /var/log/Xorg.0.log.old

# VT 冲突
systemctl show lightdm.service -p Conflicts -p After
systemctl show getty@tty7.service -p WantedBy -p After
systemctl status getty@tty7

# 启动链
systemd-analyze critical-chain getty@tty7.service
```

---

## 结语

这次故障的本质不是“密码没记住”，也不是“自动登录没配好”，而是一个典型的 **VT 争用 + systemd 延迟冲突**：

> 自动登录先赢了一次，但 `getty@tty7` 在几十秒后姗姗来迟，把 X 从 VT7 上挤了下去。

排查的关键，不是盯着“登录界面”本身，而是把**认证会话、X 服务器、VT、systemd 单元启动顺序**放在同一条时间线上看。当多条证据都指向同一个 1 秒窗口时，根因就浮出水面了。

