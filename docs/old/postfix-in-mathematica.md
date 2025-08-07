---
title: 'postfix in mathematica'
date: 2019-08-18 17:17:14
tags: [mathematica]
published: true
hideInList: false
feature: 
---
我有一个多项式F,可以用CoefficientList[F,q]写出其系数。


但如何写成postfix的形式？比如F // CoefficientList[#, q] 这种形式。我试了很多次 .

只需要：


F // Function[CoefficientList[#, x]]


即可。

-----------------

更简单的写法是 F // CoefficientList[#, q]&                   - 无影东瓜



The idea is that (body)& creates a function. For example,
```
(# + 3) & 
```
maps the argument to a value 3 greater.

```5 // (# + 3) &``` gives 8.

Moreover,

```
Sequence[3,2]// Function[{x,y}, x+1]```

gives 4.


