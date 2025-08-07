---
title: 'repost haskell 的“愚蠢”'
date: 2024-09-22 20:48:34
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
haskell 的“愚蠢”
· 2023-03-20 ·
我曾经以为haskell是设计精良的语言，直到我开始学习它后一下子遇到一个让我半夜头皮抓破的问题。我本想赶快把它搞定就睡觉，但最终让我不得写下这件事情并宣布haskell 真的很傻。
这个问题的最简单的版本其实就是
length [1..9] / 1
或者
length [1..9] / log 9
会出错：no instane for (franctional int) arising from a use of '/'.

我知道这涉及到整数没有fraction除法之类的问题。但9/1和9/log 9 就是可以的.你haskell真是无比贞洁，眼不容沙，就不要让我9/1.

我搜索了一下，竟然没有找到解决办法。最后只好问了chatgpt。它一下子就告诉我：
length之外在套一个fromIntegral就好。

除此之外它还提供了一些似是而非的教学，涉及比fractional 更大的floating type。我并不信服。不过还是很感谢它解决了问题。

另外不得不吐槽一下fromIntegral这个函数。我以往遇到的类型转换都是toSomeType. 这货却只指定原有的类型，目标不定。一个东西的原来的类型还不是总是确定的吗，那这就相当于随心所欲，放飞自我了。
干脆把所有可能的fromSomething合在一起写成一个AlternativeIdentity函数。但haskell不会允许你这样做的——那样就丧失了用类型编程折磨人的前提。（当然我们私下也同意，程序不应该悄悄滴就改了数据类型。）

--

冷静下来后不妨再看看这个问题。我们期望的sqrt应该是一个R+ ->R+的函数。虽然计算机对int的实现与对float的实现是完全不同的，但从道理上来说int是float的子集，所有能对float做的事情也应该能对int做。换句话说，这两者不应该是完全独立的两个type，而应该是包含关系。一个函数能接受 float参数而不能接受int参数是不能接受的。

如果在c++中，应该用函数模板等设计成polymorphic的。在haskell中呢？是否僵硬的类型系统是无法绕过的？

--

added on 2023年3月27日

这可以算是baaden-meinhoff complex的极好的例子了。我今天居然看到一个完全一样的c++的例子：

`long i = 0；

double j = sqrt(i);

上面的两行代码在VC 6.0不会出现编译错误（可能出现一个编译警告），但在VS 2005中会出现使用sqrt函数不明确的错误，为了避免出现这个错误，你最好这样写：

long i = 0;

double j = sqrt(static_cast<double>(i));
`
ref:
从VC 6.0移植代码到VS C++ 2005得出的一些经验
作者：朱金灿
来源：http://www.cnblogs.com/clever101

可能是我太习惯python,QuickBasic等的隐式转换了。其实在c系列中的sqrt也没有这么严格的类型检查的。比如DJGPP编译运行：

#include<math.h>
...
int a=3;
printf("%5f", sqrt(a));
就毫无问题。这里math.h中的声明为
double sqrt(double _x);