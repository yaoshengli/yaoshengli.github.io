---
layout:     post
title:      "jQuery插件写法"
subtitle:   "jquery插件写法"
date:       2018-10-07 12:00:00
author:     "Yao Shengli"
header-img: "img/home-bg-geek.jpg"
header-mask: 0.3
catalog:    true
tags:
    - jquery
    - jquery插件
---

## 怎么写jqery插件

这里介绍jquery插件的写发~

+ 通过$.extend()来扩张jquery
+ 通过$.fn 向jquery添加新的方法

### $.extend

```
 $.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name : 'Dude') + '!');
    }
})
$.sayHello(); //调用
$.sayHello('Wayou'); //带参调用
```
### $.fn

面向对象的插件写法

```


;(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'color': 'red',
            'fontSize': '12px',
            'textDecoration': 'none'
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})(jQuery, window, document);
```