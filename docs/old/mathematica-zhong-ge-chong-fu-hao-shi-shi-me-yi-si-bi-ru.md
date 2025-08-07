---
title: 'mathematica中各种符号是什么意思，比如@ , /, @@@ '
date: 2019-07-16 10:09:13
tags: [mathematica]
published: true
hideInList: false
feature: 
---
@是前缀，
	Prefix[f[expr]]
以缺省形式 f@expr 输出给定的 f[expr].
	Prefix[f[expr],h]
输出为 hexpr.

----------
@@是APPLY
Apply (@@)(应用)	\[SpanFromLeft]
Apply[f,expr]
或 f@@expr 用 f 替换 expr 的头部. 
Apply[f,expr,{1}]
或 f@@@expr 用 f 替换 expr 的第 1 层的头部.
Apply[f,expr,levelspec]
替换 expr 中使用 levelspec 指定的部分的头部. 
Apply[f]
表示 Apply 的运算符形式，它可以应用于表达式.
```
In[1]:= Apply[f, {a, b, c, d}]

Out[1]= f[a, b, c, d]

In[2]:= f @@ {a, b, c, d}

Out[2]= f[a, b, c, d]

In[3]:= Plus @@ {a, b, c, d}

Out[3]= a + b + c + d
```
----------


@@@

Apply[f,expr]
或 f@@expr 用 f 替换 expr 的头部. 
Apply[f,expr,{1}]
或 f@@@expr 用 f 替换 expr 的第 1 层的头部.


----------

expr /. rules表示应用一个规则或规则列表尽可能转换一个表达式 expr 的每个子部分,例如
{x, x^2, y, z} /. x -> a 就可以把列表中的x全部替换成a了
再如{a, b, c} /. List -> f 结构的头部就从List换成f了,变成f[a,b,c]

----------

//表示在表达示的结尾进行下一个运算。
比如list={1,2}
list//Total就是在结尾进行求和运算，
如果不用//就Total@@list，则Total函数在前面计算，


----------
#&



将一个带有若干个参数的函数转化为带有一个参数列表的函数：
```
In[1]:= cplus = Plus @@ # &

Out[1]= Plus @@ #1 &

In[2]:= cplus[{a, b, c}]

Out[2]= a + b + c
```



----------------


函数式编程

函数式编程是 Wolfram 语言的高度发展和深度集成的核心功能，在该语言的符号功能下变得越来越丰富，越来越方便. 将表达式 f[x] 同时视为符号数据和 f 函数的应用，这提供了集成结构和函数的独一无二的方式\[LongDash]\[LongDash]许多普通计算的高效简洁的表示方式.

	

Function (&) \[LongDash] 指定一个纯函数 (例如： (#+1)&)

#, ##, #name \[LongDash] 纯函数中变量的插符

函数作用于列表 »

Map (/@) \[LongDash] 作用于列表： f/@{x,y,z}\[LongRightArrow]{f[x],f[y],f[z]}

Apply (@@, @@@) \[LongDash] 应用于一个列表： f@@{x,y,z}\[LongRightArrow]f[x,y,z]

MapIndexed \[LongDash] 附带索引信息的映射： {f[x,{1}],f[y,{2}],f[z,{3}]}

MapThread \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] MapAt \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] MapAll \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Scan \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] ...

函数迭代 »

Nest, NestList, NestGraph \[LongDash] 嵌套一个函数: f[f[f[x]]] 等

Fold, FoldList \[LongDash] 链表折叠： f[f[f[x,1],2],3] 等

SequenceFold \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] SequenceFoldList \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] FoldPair \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] FoldPairList

FixedPoint, FixedPointList \[LongDash] 重复嵌套直到一个固定点

NestWhile \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] NestWhileList \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] TakeWhile \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] LengthWhile \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] ...

	

面向列表的函数 »

Select \[LongDash] 根据一个函数从列表中选择

Array \[LongDash] 从一个函数中创建一个数组

SortBy \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] MaximalBy \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] SplitBy \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] GatherBy \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] ...

面向关联的函数

AssociationMap \[LongDash] 根据一个函数创建一个关联

KeySortBy \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] CountsBy \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] GroupBy \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] ...

	

函数复合

Identity \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Composition \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Operate \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Through \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Distribute \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] ...

条件操作符格式 »

Curry \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Select \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Cases \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Append \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Map \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] Position \[MediumSpace]\[FilledVerySmallSquare]\[MediumSpace] ...