---
title: 'get python function source by inspect'
date: 2019-08-19 23:04:10
tags: []
published: true
hideInList: false
feature: 
---
If the function is from a source file available on the filesystem, then inspect.getsource(foo) might be of help:

If foo is defined as:
```
def foo(arg1,arg2):         
    #do something with args 
    a = arg1 + arg2         
    return a  
```
		
Then:

```
import inspect
lines = inspect.getsource(foo)
print(lines)
```

Returns:
```
def foo(arg1,arg2):         
    #do something with args 
    a = arg1 + arg2         
    return a
	```
		
But I believe that if the function is compiled from a string, stream or imported from a compiled file, then you cannot retrieve its source code.

--Rafał Dowgird