---
title: 'gridea不能同步的问题'
date: 2022-09-13 15:43:49
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
找出落灰许久的gridea，同步始终不成功。在控制台找到错误信息，是etimeout。

我ping了一下对应的地址（142.250.181.238:443，确实是github的地址），ping不通。这很奇怪，因为我直接用浏览器可以上github。我猜想可能是GFW的问题，就费老鼻子劲把windows上的_风写_又装上了(`https://assets.totallyacdn.com/desktop/win/Windscribe_2.4.exe`)。可是问题依旧。更新到0.9.3版本，没有效果。

后来发现问题竟然是:**Github令牌已经过期了？？`**

重新申请一个（无限期）令牌就好了。

---
申请的地方挺难找的：

在Github官网任何页面的右上角，点击你的个人资料照片，然后点击 Settings（设置）


在左侧边栏中，点击 Developer settings


在左侧边栏中，点击 Personal access tokens（个人访问令牌）


点击 Generate new token（生成新令牌）

Note：

选择要授予此令牌的作用域或权限。 要使用令牌从命令行访问仓库，请选择 repo（仓库）
