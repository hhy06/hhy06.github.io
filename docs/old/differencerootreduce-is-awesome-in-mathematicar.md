---
title: 'DifferenceRootReduce is awesome [in Mathematica(R)]'
date: 2019-08-21 16:14:56
tags: [mathematica]
published: true
hideInList: false
feature: 
---
Automatically gives insight to sequences, if you know the formula.

Not to be confused with FindSequenceFunction, which guesses formula given first items.

It can even guess Sin[x]:FindSequenceFunction[Table[Sin[n], {n, 1, 10}]] gives a rational function involving exponentials, and after //FullSimplify yields Sin[n].

----------

Its sibling, DifferentialRootReduce, works for functions on RR. Like:

```
\[
\text{DifferentialRootReduce}[\sin (x),x]

\text{DifferentialRoot}\left(\{\unicode{f818},\unicode{f817}\}\unicode{f4a1}\left\{\unicode{f818}(\unicode{f817})+\unicode{f818}''(\unicode{f817})=0,\unicode{f818}(0)=0,\unicode{f818}'(0)=1\right\}\right)(x)
\]
```

Letters with dots above/under it seems to be formal arguments never endowed with a value.