---
title: 'repost 从源码编译dos下的tinyscheme'
date: 2024-09-22 20:49:05
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
从源码编译dos下的tinyscheme
· 2023-03-23 ·
编译是困难而迷人的工作。不成功时你会很无助，因为很多问题似乎并不是你自己造成的（而是该死的计算机社群和establishment）。成功之后当然很激动，但这很快就过去了，因为这（大抵）也不是你自己做成的（而是编译器，写代码的人，写编译器的人，图灵和von Neumann, etc）。（即使你自己写的源码。）仔细想想，这很像生孩子。

而且让人睡不好觉。

我下载了tinyscheme 1.39，自带源码。二进制文件可以在win下运行。但一个简单的命令行程序不能在dos下跑，总归是遗憾的。所以我就不自量力自己编译一下吧！

我以前只在linux下编译过现成的工程。所谓现成，是指脚本已经写好，只要在命令行输入几个命令就好。但这次似乎不同。makefile里面没有指定dos下是怎样的。这能行吗？

于是我进行了下面的（没头苍蝇一般的）尝试：

直接用c编译器干scheme.c。
我尝试了vc3， open watcom，好像还有turbo c和某个gcc。都会出现各种bug。其中win3.1下的vc3是最顺利的，编译只有一坨warning，但在ld出现错误。（现在回想起来这不是没有道理的！）

然后我尝试人肉解读makefile，把里面的参数copy出来用加在命令行的编译器命令后面。还是各种bug。

然后我装了dgdev，再make。告诉我缺gcc。

（如果不是迷迷糊糊搞到半夜，我也许早就会知道这都是徒劳。）然后我睡了一觉，换了一台机器。

这次我找到了delorie.com的zip picker页面，指导我需要下载下面一堆（你也可以根据你自己的系统和需求自定）：

unzip32.exe to unzip the zip files 95 kb

v2/copying.dj DJGPP Copyright info 3 kb
v2/djdev205.zip DJGPP Basic Development Kit 2.4 mb
v2/faq230b.zip Frequently Asked Questions 664 kb
v2/readme.1st Installation instructions 23 kb

v2gnu/bnu2351b.zip Basic assembler, linker 6.0 mb
v2gnu/gcc930b.zip Basic GCC compiler 34.1 mb
v2gnu/mak44b.zip Make (processes makefiles) 473 kb

注意现代浏览器不方便从从ftp下载，最好选个http镜像。

把它们解压到同一个文件夹！他们的bin目录都堆叠在一起。（When properly installed, you should have a c:\djgpp\bin directory, and in it should be at least gcc.exe, as.exe, and stubify.exe. If all the files are in c:\djgpp with no subdirectories, or you see directories like c:\djgpp\djdev203, you need to delete everything and try a different unzip program.）

还有些设置shell等，以及路径，最重要的应该是DJGPP的目录：
set PATH=C:\DJGPP\BIN;%PATH%
set DJGPP=C:\DJGPP\DJGPP.ENV

然后就可以试着make了。这次出现的问题是有个scheme-private.h头文件名字太长了。

你需要在makefile和若干.c, .h中把这个文件都改成schemep.h，或其他你喜欢的8.3文件名。另外还有个dynload........h头文件也一样。

然后出现一个奇怪的编译错误，说某个*strlwr重复定义了，而且跟string.h中定义的不一样。我在scheme.c中找到了那一行， 把 s都加上了前面的下划线。如果这只是一个标识符应该没有这么大的意义。局部变量叫什么名字又怎样？但据说下划线是编译器变量etc。。。唉

static const char *strlwr(char *_s) { // I added _ for these lines... const char *p=_s; while(*_s) { *_s=tolower(*_s); _s++; } return p; }

接下来出现的问题是ld cannot find ldl. 你可以盲目百度一下，得知ldl是linux下才需要的东西。makefile里确实（只）在linux部分有一行提及到ldl。最终我把这一行删了。

我不确定是不是应该告诉make这里是dos。不过我也写不出一段dos的makefile。（据说能写makefile是对软件工程和项目编译过程整体把控能力的体现，云云。）

再接下来是一些缺少separator的问题。可能是刚才win或dos下的文本编辑器修改时把makefile的tab搞成了空格。换成notepad++或其他靠谱编辑器，换回成tab。吐槽：make要求每个命令前都是tab真是害死无数人。

接下来竟然就行了。我都已经记不清编译完它说了什么，好像很轻描淡写输出了一些编译结果文件就没了。这才是最大的bug。怎么就编译出来了呢。不应该操起扬声器吹一段喇叭？我运行scheme.exe, 测试了简单的命令，没问题。

我之前都是在dosbox-x下操作的。换个dosbox跑一下，会报错no DPMI get csdpmi*b.zip。（我猜dosbox-x重启之后也会)

这是一个dos下的运行库，让程序可以以保护模式运行。也许可以
set DJGPP=C:\DJGPP\DJGPP.ENV，但我直接从csdpmi压缩包拷贝了bin文件夹的程序，放在scheme旁边，就好了。

我不确定以后还会不会出现什么幺蛾子。要不我这个dosbox以后就不关了：）毕竟是第一次自己编译出东西呀。