---
title: '随机数与进度条[m-ca]'
date: 2019-09-14 15:25:22
tags: [mathematica]
published: true
hideInList: false
feature: 
---
```
res = {};
For[i = 10, i <= 200, i = i + 1,
 Temp = PrintTemporary[i, ListPlot[res]];
 Pause[1]; If[RandomReal[] < 0.3, i = Round[Sqrt[i]]]; 
 AppendTo[res, i];
 NotebookDelete[Temp];
 ]
 ```
 
 
 ```
 reslist = {};
For[i = 1, i <= 2^10, i++,
 pt = PrintTemporary[i, " -> ", PartitionsP[i]];
 AppendTo[reslist, pt];
 If[Length[reslist] >= 4,
  NotebookDelete[reslist[[1]]];
  reslist = Part[reslist, 2 ;; -1]
  ];
 Pause[1];
 ]
 ```