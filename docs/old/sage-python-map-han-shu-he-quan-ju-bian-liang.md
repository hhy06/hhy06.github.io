---
title: '[sage] python map 函数和 全局变量'
date: 2020-02-13 20:33:13
tags: []
published: true
hideInList: false
feature: 
---
```
a=1

f=lambda lst: lst+[a];a+=1

map(f, [[6],[7],[8]])
```

你猜猜结果是多少？

```
1) [[6,1],[7,1],[8,1]]
2) [[6,1],[7,2],[8,3]]
```

 结果竟然是。。。>[[6, 2], [7, 2], [8, 2]]


因为分号后面是单独一个python语句，而不是lambda函数的一部分。。。。

