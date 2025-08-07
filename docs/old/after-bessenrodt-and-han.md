---
title: 'After Bessenrodt and Han'
date: 2019-08-05 17:01:01
tags: [sage]
published: true
hideInList: true
feature: 
---
Bessenrodt and Han:


> hooks in par(n) and lambda_i in par(n): symmetric distribution!!



好结果都已经被别人做出来了，这很正常。

那我就列一些没有意义的数据咯。


------------------


**def**. pp(n)=plane partitions of size(n)

a cell in ppar $\in$ pp(n) has arm, leg and head statistic.

a 3d-hook, or hook for short, is arm+leg+head+1.

Here's a dictionary of all hooks in ppar(n):

```
1 {1: 1}
2 {1: 3, 2: 3}
3 {1: 9, 2: 3, 3: 6}
4 {1: 21, 2: 15, 3: 6, 4: 10}
5 {1: 48, 2: 30, 3: 15, 4: 12, 5: 15}
6 {1: 102, 2: 75, 3: 45, 4: 24, 5: 21, 6: 21}
7 {1: 213, 2: 138, 3: 102, 4: 46, 5: 42, 6: 33, 7: 28}
```

注意到ppar(n)中n作为hook出现的次数是个binomial number，这很好理解。

1-hook, 也就是corner，出现次数是ppar的cover关系的数量： A090984	

n-1 hook 的数量，
3,6,12,21,33,48,66,87
 	似乎是：
A290768		a(n) = 3/2*(n^2 - n + 2).	 

n-2, 也是这样

except 21, 30. Start from 45,46, 69,... it is 11x^2+34x+69.

























--------- 

sage interpolation


```sage: data6
[(-1/6, 512/693*sqrt(6)),
 (-1/3, 16/15*sqrt(3)),
 (-1/2, 1/3*(4*sqrt(2))),
 (-2/3, 1/4*sqrt(6)*pi),
 (-5/6, integrate(e^(-u)/sqrt(-6/5*e^(-5/6*u) + 6/5), u, 0, +Infinity)),
 (-1, 2)]
sage: anneau=RDF['x']
sage: anneau.lagrange_polynomial(data6)
 ```

