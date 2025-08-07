---
title: '我这次是如何试图阻止windows锁屏广告的'
date: 2020-02-05 12:51:29
tags: []
published: true
hideInList: false
feature: 
---
我这次是如何试图阻止windows锁屏广告的
最近常常在解锁win10时发现锁屏图案变成了广告。
0.用everything排查最近修改的文件，发现广告图片是
```
C:\Windows\WinSxS\amd64_microsoft-windows-t..nbackgrounds-client_31bf3856ad364e35_10.0.18362.1_none_af74338f76aa2bd0
```

路径下的img105.jpg

1.这个文件夹的所有者是trusted installers。修改文件夹的所有者后，我删除了这个图片文件，并建立了同名文件夹防止广告再生。


-------------------


More messed up things happened.

I lied when I said I deleted the pic; I didn't. It was moved to my desktop.

This afternoon the lockscreen changed again. I checked that the pic on my desktop changed as well; so did a set of pics in 

```
C:\Windows\Web\Screen
```