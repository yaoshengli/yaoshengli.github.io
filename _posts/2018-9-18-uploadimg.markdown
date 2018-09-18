---
layout:     post
title:      "图片压缩，图片旋转矫正方向，图片预览"
subtitle:   "移动端图片上传"
date:       2018-09-18 12:00:00
author:     "Yao Shengli"
header-img: "img/home-bg-geek.jpg"
header-mask: 0.3
catalog:    true
tags:
    - 图片上传
    - 旋转 压缩 预览
---

## 移动端常用图片上传，预览，旋转，压缩

***

该项目地址[img_compress_rotate_preview_upload](https://github.com/legend-li/img_compress_rotate_preview_upload)

***

### 观后感

该项目使用移动端，兼容性ie10以上，所有用该插件上传的图片均经过canvas旋转压缩，项目没有给出按照上传图片的尺寸大小来判断是否进行压缩的办法，预览图片采用base64位图片预览方式，如果在pc端的话，需要用到滤镜，检测图片格式考虑了jpg和png，没考虑gif。默认 压缩率0.5。旋转图片采用exif.js，压缩作者自己写的，用的canvas的toDataUrl

***



[查看例子哦,记得按f12查看输出信息](/example/uploadimg/ImgProcess.html)