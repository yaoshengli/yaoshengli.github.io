---
layout:     post
title:      "html2canvas转图模糊"
subtitle:   "html2canvas踩坑，持续更新"
date:       2018-09-4 12:00:00
author:     "Yao Shengli"
header-img: "img/home-bg-geek.jpg"
header-mask: 0.3
catalog:    true
tags:
    - html2canvas
    - dom转img
---

## html2canvas转图模糊
***
该项目地址[html2canvas](https://github.com/niklasvh/html2canvas)
***
### 原因

原理是canvas转图，项目默认canvas为1倍缩放，由于手机存在高清屏，dpi比例会大于1，而canvas本身是位图，所以会出现模糊

### 初步解决方案

原理是将canvas按dpi比例放大相应的倍数，然后去画图，然后再缩放至1倍大小去显示，**这里图片如果不是考左上的话，得设置canvas的偏转**。

代码
```javascript
    var width = $("#fenxiaobg").width()//dom的宽度
    var height = $("#fenxiaobg").height()//dom的高度


    var canvas = document.createElement("canvas");
    var scale = 3;//缩放比例
    canvas.width = width * scale;
    canvas.height = height * scale;

    var ctx = canvas.getContext("2d")
    ctx.scale(scale, scale);
    var x = ($(window).width() - width) / 2//左右偏移量
    var top = $("#fenxiaobg").offset().top//上下偏移量
    ctx.translate(-x, -top)

    html2canvas($(".html2canvas")[0], {

    canvas: canvas,
    onrendered: function(canvas) {

        var dataUrl = canvas.toDataURL();
        var $img = $("<img>").attr("id", "scimg").attr("src", dataUrl).css({

            width: width,
            height: height
        })
        $(".html2canvas").empty()
        $img.appendTo($(".html2canvas"))
        $(".tip-modal").hide()

    }
    })
    })
```


