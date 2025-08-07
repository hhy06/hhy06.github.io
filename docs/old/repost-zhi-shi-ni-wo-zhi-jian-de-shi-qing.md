---
title: 'repost 只是你我之间的事情'
date: 2024-09-22 20:50:30
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
只是你我之间的事情
· 2023-03-28 ·
我一直有这样一种模糊的感觉：计算机程序是我和计算机之间的事情。计算机不应该把它暴露给“用户”。具体而言，一个程序写成什么样子，用什么变量名，用loop 循环还是for循环，不应该被用户感知到。

或者说，用户可以感知到的应该是编译之后得到的东西。

但今天我突然发现不是这样。比如在haskell中自己定义数据类型

data complexnumber = complexnumber { realPart :: Float, imaginarypart ::Float }

let a =　cmplexnumber { realpart = 1, imaginarypart = 1 }

putStrLn $ show a
*Main> a
ｃomplexnumber {realPart = 1.0, imaginarypart = 10.0}
好吧， 这算是什么事情呢？ complexnumber这个东西，这个token，到底是数据还是代码呢？

按照我从quickbasic到c++到python的理解，能显示在屏幕上的东西无非是：数，字符串，系统信息。后者我我无法控制，只能接受。前两者都是确定的（存在于计算机内存中）的东西，是程序生成的。

其实早期的计算机似乎对与打印这件事是非常谨慎的。比如你可以在pascal中搞一个enum类型，列出monday tuesday 直到sunday，但这些fancy的名字不会让你打印到屏幕上。再比如早起的c++打印true false都打成0和1，而非字符串。这里怎么就开开心心打出一个complexnumber了呢？我可从来没有构造过这样一个字符串呀。

这里的complexnumber本质上是一个函数：它生成一个complexnumber对象，不是吗。
*Main> :t Complexnumber
Complexnumber :: Float -> Float -> Complexnumber
在计算机内部，这个词背后应该通过一个token列表对应到一个函数对象的地址。。。在此之后就没有complexnumber这个词的事情了。

也许这个例子不好，那么
data shapes = circle Float | rectangle Float Float
这里的circle就明显是一个函数了，也可以
:t circle
之。但circle生成的其实是一个“字面意义”上的对象，你show它就得到一个circle 3.3这样的结果。也就是说，show的过程把计算机代码暴露出来了。代码和数据的泾渭分明的边界被打破了。这是以前从来没有过的。

不要觉得这是REPL，系统在和程序员打交道。编译之后依然这样。

C:\workbench\haskell>ghc --make t.hs
[1 of 1] Compiling Main             ( t.hs, t.o )
Linking t.exe ...
C:\workbench\haskell>t.exe
Complexnumber {realPart = 3.0, imaginaryPart = 99.0}
也就是说，这里程序的代码（函数名）在编译之后不但不受改变，还原样出现在输出结果中。这与我之前所想的”换个函数名编译之后还是不变“的想法完全相悖。

这种情况其实我以前也见过，比如lisp中你搞一个symbol, 名字叫做dog，然后print它：
(print 'dog)
结果就是赤裸裸的大写DOG。那么dog符号到底是什么呢？它就是个符号。没有value与之bind。如果你去掉瞥号，那就会报错：variable DOG has no value.

但lisp毕竟是lisp，我们不能用常理要求它。