---
title: 'repost run a simple HTTP server from clisp REPL'
date: 2024-09-22 20:49:34
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
run a simple HTTP server from clisp REPL
· 2023-03-27 ·
First you should have some sort of common lisp. I have GNU clisp 2.49 under win10.

Then you should have quicklisp for getting packages. It is described in the following webpage:

https://grishagin.com/lisp/windows10/2017/01/26/install-lisp-Windows10.html#:~:text=Install%20quicklisp.%20Place%20quicklisp.lisp%20into%20C%3Alisp%20Run%20CLISP,the%20following%3A%20%28load%20%22C%3A%2Flisp%2Fquicklisp.lisp%22%29%20%28quicklisp-quickstart%3Ainstall%20%3Apath%20%22C%3A%2Flisp%2Fquicklisp%2F%22%29%20%28ql%3Aadd-to-init-file%29

Install quicklisp.
Place quicklisp.lisp into C:\lisp
Run CLISP and execute the following:
(load "C:/lisp/quicklisp.lisp")
(quicklisp-quickstart:install :path "C:/lisp/quicklisp/")
(ql:add-to-init-file)

--

Then i copied the following code into a "site001.lisp" file.

`;;;; hello-world.lisp

(ql:quickload "restas")

(restas:define-module #:hello-world
(:use :cl :restas))

(in-package #:hello-world)

(define-route hello-world ("")
"Hello World")

(start '#:hello-world :port 8080)`

In the end I ran (load "site001.lisp"). It started frantically download packages for a minute and everything froze afterwards. I waited for a few minutes and realized that I have a helloworld page in my browser when I type localhost:8080.

So that is it. Everything is fine except my workbench foler is totally messed up.