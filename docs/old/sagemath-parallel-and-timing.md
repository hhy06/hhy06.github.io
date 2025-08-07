---
title: 'sagemath: parallel and timing'
date: 2019-09-08 22:02:08
tags: [sage]
published: true
hideInList: false
feature: 
---
Ue @cached_function to speed up recursions!

```
@cached_function
def fib(n):
    if n<0:
        return 'bug'
    if n==0 or n==1:
        return n
    else:
        print n
        return fib(n-1)+fib(n-2)
        
print fib(10)
```

Use @parallel decorator to parallelly calculate 




------------

timing:

Failed attemt


```
import time
def timecalc(f):
    a=time.time()
    res=f
    print time.time()-a
    return res

for m in range(60):
    print m
    print timecalc(sum([sum([sum(x) for x in Partitions(n)]) for n in range(1,m)]))
```
