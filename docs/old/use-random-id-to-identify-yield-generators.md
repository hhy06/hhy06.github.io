---
title: 'use random id to identify yield-generators'
date: 2019-08-10 09:17:43
tags: []
published: true
hideInList: false
feature: 
---
code is:

```
import random

def nexter(max):
    n=1
    id=random.random()
    while n<max:
        print id
        yield n
        n=n+1
        

for a in nexter(4):
    for b in nexter(4):
        print a,b
   
```

result is:

```
0.880003860544
0.251749859401
1 1
0.251749859401
1 2
0.251749859401
1 3
0.880003860544
0.0484719374343
2 1
0.0484719374343
2 2
0.0484719374343
2 3
0.880003860544
0.851560375492
3 1
0.851560375492
3 2
0.851560375492
3 3
```

so we know the generator for a lives all the time and 3 generators for b were generated (and killed)