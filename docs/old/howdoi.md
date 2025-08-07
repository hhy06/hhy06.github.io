---
title: 'howdoi'
date: 2019-08-19 16:47:29
tags: []
published: true
hideInList: false
feature: 
---
this is an interesting python application that lets you search for coding solutions in a console (without web-surfing, emm).

I downloaded the lot from github and decompressed. Running

```
python setup.py install
```
brings mixed information. While some things are installed successfully, a bug also shows up:

```
Installed c:\python27\lib\site-packages\howdoi-1.2.1-py2.7.egg
Processing dependencies for howdoi==1.2.1
Searching for appdirs
Reading https://pypi.org/simple/appdirs/
Download error on https://pypi.org/simple/appdirs/: [Errno 1] _ssl.c:504: error:
1407742E:SSL routines:SSL23_GET_SERVER_HELLO:tlsv1 alert protocol version -- Som
e packages may not be found!
Couldn't find index page for 'appdirs' (maybe misspelled?)
Scanning index of all packages (this may take a while)
Reading https://pypi.org/simple/
Download error on https://pypi.org/simple/: [Errno 1] _ssl.c:504: error:1407742E
:SSL routines:SSL23_GET_SERVER_HELLO:tlsv1 alert protocol version -- Some packag
es may not be found!
No local packages or working download links found for appdirs
error: Could not find suitable distribution for Requirement.parse('appdirs')
```

It later dawned on me that ```appdirs``` is a python package so I manually ran


```
pip install appdirs
```

which brings more mixed info:

```
ERROR: howdoi 1.2.1 requires cachelib, which is not installed.
ERROR: howdoi 1.2.1 requires pyquery, which is not installed.
Installing collected packages: appdirs
Successfully installed appdirs-1.4.3
```


So in the end it works: it tells me that it could not establish internet connection.


--- addendum  --

HOWDOI works well in CFC.