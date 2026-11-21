# when you cannot enter url via alt+d

在firefox+vimium（或vimium C） 按alt+d 原本应该进入地址栏，但现在被vimium插件识别为按键D并向下滑动页面。这事通过vimium 中 unmap <a-d> 无法修复。 

现在我们希望恢复alt+d 的地址栏功能，并保留d下滑等vimium功能，怎么办?

GLM(zchat.z.ai) helped me. I solved it by setting privacy.fingerprintingProtection.overrides back to null value (which was AllSites, for some reason).

Here's the full survey. 


## 一句话结论

这不是 Vimium 的 bug，也不是 unmap 写法不对——而是 Firefox 的反指纹伪装功能 privacy.resistFingerprinting（RFP）在“说谎”：它向网页和扩展谎报“Alt 没有被按下”。于是 Vimium 收到的就是普通的 d，执行了向下滚动。<a-d> 这个按键对插件来说根本不存在，所以 unmap <a-d> 无效。

## 根因分析（证据链）

1. 这是 Firefox 的“预期行为”，Mozilla 明确不修。

    Bugzilla Bug 1598862（标题就是“RFP 开启时 alt+字母热键不被网页 JS 识别”）中，Mozilla 开发者 Tim Huang 原话："Unfortunately, we spoof the modifier state of ALT keys when RFP is on. So this is expected behavior. That's because some keyboard layouts rely on the ALT key to type certain letters, so it could reveal your real keyboard layout." —— 即 RFP 会把 Alt（以及部分情况下 Shift/Ctrl/AltGr）的修饰状态伪装成“未按下”，防止网站通过 Alt+字母产生的字符推断你的真实键盘布局。
    该 bug 被定为 P5，官方明确拒绝做“只关键盘伪装”的单项开关，理由是：“如果给你单独一个开关，你的指纹（= RFP 全集减去键盘伪装）反而会让你变得独一无二。”

2. 机制与你的症状完全吻合。

    Bug 1222285（Firefox 59 引入）：RFP 开启时，键盘事件被伪装成美式布局，修饰键事件被抑制、修饰状态被谎报。
    Vimium 官方仓库有大量一模一样的报告：#3200（"pressing alt+d causes vimium to perform the scrollPageDown... disabling resistFingerprinting fixed it"，Vimium C 作者 gdh1995 也在其中确认了原因）、#3360（"Alt-D is processed as 'D'"）、#4053（RFP "hides the status of the Alt key"）。
    LibreWolf issue #1335：LibreWolf 默认开启 RFP，所以它的用户全军覆没（连 KeePassXC 的 Alt+Shift 快捷键也会失效）。Tor Browser、Waterfox 默认同样如此；用 Arkenfox 等 user.js 硬化的 Firefox 也默认开启。

3. 为什么所有插件侧手段都救不了 Alt+D：

    unmap <a-d>：移除的是一个永远不会到达插件的键——事件到 content script 时已经没有 Alt 信息了。
    unmap d：能止住滚动（#3360 里有人这么做过），但等于砍掉 d 下滑功能，不满足你的需求。
    排除规则/passKeys：#4053 里对 Alt+数字 有效（写成 pattern=|、keys=123456789），是因为数字键 Vimium 没占用、可以整体放行给浏览器；而 d 恰恰被滚动功能占用——插件在内容层根本无法区分“Alt+D”和“d”，信息在到达插件之前就被 Firefox 销毁了。这是死结，任何 WebExtensions 键盘类插件（Vimium/Vimium C/Surfingkeys/Tridactyl）都一样。
    Firefox 的“聚焦地址栏”也没有任何扩展 API 可以调用，插件无法自己实现 Alt+D。

4. 60 秒自检（确认你就是这种情况）：

    地址栏输入 about:config，搜索 privacy.resistFingerprinting，看 privacy.resistFingerprinting 和 privacy.resistFingerprinting.pbmode（仅隐私窗口生效）是否为 true。LibreWolf 也可在设置 → 隐私里直接看到“启用 ResistFingerprinting”开关。
    进一步验证：普通网页上按 F12 打开控制台，粘贴运行
    js

    addEventListener('keydown', e => console.log(`key=${e.key} alt=${e.altKey} ctrl=${e.ctrlKey}`), true)

    然后按 Alt+D：输出 key=d alt=false 即坐实修饰键被谎报（正常应为 alt=true）。

## 修复方案（按你的取舍选一个）
### 方案 A：直接关闭 RFP（最简单，功能完整恢复）

    about:config → 把 privacy.resistFingerprinting 改为 false（如有 privacy.resistFingerprinting.pbmode 也一并改 false）。
    Vimium/Vimium C 的任何配置都不用动，Alt+D 立即恢复进地址栏，d/u/j/k/f 等全部照旧。
    若之前为修这问题在插件里加过 unmap <a-d>、passKeys 之类的实验配置，建议删掉。
    注意：如果你改回 false 后重启浏览器它又变回 true，说明是被扩展或 profile 里的 user.js 强制设置的——逐个禁用扩展排查（官方 KB 有此方法），或检查 user.js 中的相关行（Arkenfox 默认开 RFP）。

代价：失去 RFP 的整套硬伪装（时区 UTC、窗口尺寸、字体、UA、键盘布局等）。
### 方案 B：关 RFP、改用新式细粒度 FPP（想保留大部分反指纹保护）

Firefox 118+ 提供了低破坏性的 fingerprintingProtection（FPP），默认目标集刻意不含键盘布局伪装这类高破坏项：
text

privacy.resistFingerprinting      → false
privacy.resistFingerprinting.pbmode → false
privacy.fingerprintingProtection  → true
privacy.fingerprintingProtection.overrides → 保持默认值，不要改

Canvas 随机化、JS 时间/时区等低破坏保护仍在；同时建议把 设置→隐私与安全→增强型跟踪保护 设为“严格”。两点提醒：

    千万别把 overrides 写成 +AllTargets——那等于全套 RFP，键盘伪装会回来，Alt+D 再次失效（参见 privacyguides 的讨论）。
    Mozilla 官方 KB 明确说 RFP“不建议普通用户开启”，对大多数人 FPP + 严格跟踪保护已够用。

### 方案 C：坚决保留 RFP（隐私优先，那就换按键习惯）

RFP 开启期间 Alt+D 无解（官方设计决定），用这些浏览器保留快捷键替代——它们由浏览器主进程处理，插件和 RFP 都碰不到：

    Ctrl+L：聚焦地址栏（效果与 Alt+D 完全相同）；F6 也可以（轮转焦点）。
    Windows 用户还可最后兜底：用 AutoHotkey 把 Alt+D 重映射为发送 Ctrl+L 给 Firefox。

## 改完后的验证清单

    普通网页按 Alt+D → 光标进入地址栏并全选 URL；
    按 d / u → 仍滚动半页，j/k 逐行滚动，f 出链接提示；
    按 Ctrl+L → 也进地址栏（无论如何都该好使，可作对照）。

如果你的 privacy.resistFingerprinting 本来就是 false、自检控制台里 alt=true 却仍然滚动，那就是另一类问题（插件配置或其他扩展注入），把控制台输出告诉我，我再帮你往插件侧排查。
