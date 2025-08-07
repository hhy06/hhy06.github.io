---
title: 'Eulerian matrix of size 6'
date: 2019-07-15 09:10:50
tags: [research,sage]
published: true
hideInList: false
feature: 
---
```
[       1        1        1        1        1        1]
[       1        4       11       26       57      120]
[       1       11       66      302     1191     4293]
[       1       26      302     2416    15619    88234]
[       1       57     1191    15619   156190  1310354]
[       1      120     4293    88234  1310354 15724248]
```

Corresponding Eulerian triangle:
```
[       0        0        0        0        0        0        0        0        0        0        0        0]
[       1        0        0        0        0        0        0        0        0        0        0        0]
[       1        1        0        0        0        0        0        0        0        0        0        0]
[       1        4        1        0        0        0        0        0        0        0        0        0]
[       1       11       11        1        0        0        0        0        0        0        0        0]
[       1       26       66       26        1        0        0        0        0        0        0        0]
[       1       57      302      302       57        1        0        0        0        0        0        0]
[       1      120     1191     2416     1191      120        1        0        0        0        0        0]
[       1      247     4293    15619    15619     4293      247        1        0        0        0        0]
[       1      502    14608    88234   156190    88234    14608      502        1        0        0        0]
[       1     1013    47840   455192  1310354  1310354   455192    47840     1013        1        0        0]
[       1     2036   152637  2203488  9738114 15724248  9738114  2203488   152637     2036        1        0]
```


We may check that Eulerian matrix is TP2, therefore log[A_ij] is tropical TP. Does this help anyone?

Also Eulerian matrix is tropical TP2. Does not even use induction.

Euler triangle is not tropical TP2. see 11,1, 66 and 26 square.








