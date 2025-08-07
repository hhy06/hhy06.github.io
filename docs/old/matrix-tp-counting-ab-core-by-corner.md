---
title: 'Matrix TP: counting ab core by Corner'
date: 2019-07-14 16:23:00
tags: [research,sage]
published: true
hideInList: false
feature: 
---

Wang and Yang: Narayana matrix is TP.
Huang and Wang: n,n+1-core counted by corner is Narayana.

What about n,kn+a-core?


First we check n,n+1 cores counted by #corners:


1
1
1 1
1 3 1
1 6 6 1
1 10 20 10 1
1 15 50 50 15 1

this is Narayana numbers all right, and TP.


Now n,2n+1 cores. Fuss-Catalan case!

```
[   1    0    0    0    0    0    0    0    0    0    0    0    0]
[   1    0    0    0    0    0    0    0    0    0    0    0    0]
[   1    1    1    0    0    0    0    0    0    0    0    0    0]
[   1    3    5    2    1    0    0    0    0    0    0    0    0]
[   1    6   16   16   12    3    1    0    0    0    0    0    0]
[   1   10   40   70   79   46   22    4    1    0    0    0    0]
[   1   15   85  225  365  351  245  100   35    5    1    0    0]
[   1   21  161  595 1323 1841 1801 1176  590  185   51    6    1]
```

Minimal minors of all sizes:
```
0 1
1 0
2 0
3 0
4 0
5 0
6 0
7 0
```
So we can safely conjecture that this is part of an infinite TP matrix.

More Fuss-Catalan case. n,2n-1 case!

result:

```
[   1    0    0    0    0    0    0    0    0    0    0    0    0    0]
[   1    0    0    0    0    0    0    0    0    0    0    0    0    0]
[   1    1    0    0    0    0    0    0    0    0    0    0    0    0]
[   1    3    2    1    0    0    0    0    0    0    0    0    0    0]
[   1    6   10    9    3    1    0    0    0    0    0    0    0    0]
[   1   10   30   45   34   18    4    1    0    0    0    0    0    0]
[   1   15   70  160  201  165   80   30    5    1    0    0    0    0]
[   1   21  140  455  840 1001  776  435  155   45    6    1    0    0]
[   1   28  252 1106 2800 4578 5048 3997 2226  945  266   63    7    1]
```
Minors of sizes<=8 are all non-negative.

We skip n, kn+a type here. Rest assured that n,3n-1 is checked, to say the least.

What people don't often realize is that we may also consider 2n-1, 3n-1 cores.

This is where things go wrong.

 ```
[   1    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0]
[   1    3    2    1    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0    0]
[   1   10   19   21   17   14    9    5    2    1    0    0    0    0    0    0    0    0    0    0    0    0]
[   1   21   85  178  260  308  291  237  164  107   57   33   16    7    2    1    0    0    0    0    0    0]
[   1   36  256  896 2051 3501 4700 5290 5112 4423 3395 2430 1552  922  493  264  117   56   23    9    2    1]
  ```
	
In row 	[2, 3, 4] and column [8, 9, 10]  we have the following submatrix

```
[   2    1    0]
[ 164  107   57]
[5112 4423 3395]
```

with determinant -43088. Sucks!


Again we look at the n,2n-1 case. We check out the columns.

The first column ```1,1,1...``` is constant. The second ```1,3,6,10``` is the choose-2 binomial number. 
The third is 2*binomial(n,4). 

The fourth col does not seem polynomial at first: 	
[0, 0, 0, 1, 9, 45, 160, 455, 1106, 2394

but it is infact a pol of degree 6.


