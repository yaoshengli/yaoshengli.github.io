---
layout:     post
title:      "移动端触摸运动解决方案"
subtitle:   "来源于腾讯"
date:       2018-09-07 12:00:00
author:     "Yao Shengli"
header-img: "img/home-bg-geek.jpg"
header-mask: 0.3
catalog:    true
tags:
    - touch
    - 触摸运动
---

## 腾讯的触摸运动解决方案

***

该项目地址[alloyTouch](https://github.com/AlloyTeam/AlloyTouch)

***

### 作用

官方给出了几个不错的例子，有下拉刷新，轮播，基础滚动条，并具有方便的可扩展性，个人认为基础的设置缺少了判断向上滑还是向下滑向左滑还是向右滑，另外如果targetdom不动的话就得不到想要的触摸数据了，为了完善这个想法，先改代码如下

***



[按12 mobile下查看例子哦](/example/touch/index.html)