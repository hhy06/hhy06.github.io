---
title: '这就是为什么不应该在网上抄看不懂的代码'
date: 2019-09-05 00:55:06
tags: []
published: true
hideInList: false
feature: 
---
```
C:\TEMP\temp notes>mshta "javascript:var s=clipboardData.getData('text');if(s)ne
w ActiveXObject('Scripting.FileSystemObject').GetStandardStream(1).Write(s);clos
e();"  | more  1>>NewEntry.txt
```
拒绝访问。

我不知道为什么拒绝访问了。也没有办法维护，因为我甚至不知道这句到底在干什么。

也许我应该用python重新写一个快速复制剪贴板的脚本了。，。

