---
title: 'win英文输入法作为默认输入法'
date: 2020-04-17 08:51:34
tags: []
published: true
hideInList: false
feature: 
---
#win英文输入法作为默认输入法
 
方法1:已失败

修改注册表，。。。后来不知怎么又设置了一下输入法就丧失效果了。

方法2:

将小狼毫改造成英文输入法。

最好的办法当然是搞一个输入方案，只输英文，但我还没搞清怎么办。目前临时将小狼毫默认为英文输入，参考：

【ref】https://www.jianshu.com/p/7eb4a2ac0b69

摘要：默认情况下，Rime 使用“朙月拼音”，对应的配置文件为 luna_pinyin.schema.yaml。如果想将它设置为默认输入英文，则将该文件中switches->ascii_mode->reset的值修改为1即可：


当然你可以直接修改yaml文件，或者增加如下的.custom文件：

```
patch:
	switches/ascii_mode:
		reset:1
```

保存成
> C:\Users\king18\AppData\Roaming\Rime\build\luna_pinyin.schema.custom


