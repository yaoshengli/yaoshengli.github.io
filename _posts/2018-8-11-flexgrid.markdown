---
layout:     post
title:      "一个简易flex框架"
subtitle:   "完全适用移动端"
date:       2018-08-11 12:00:00
author:     "Yao Shengli"
header-img: "img/home-bg-geek.jpg"
header-mask: 0.3
catalog:    true
tags:
    - 可用的轮子
---

## Github html项目 flexbox grid

项目地址[http://flexboxgrid.com/](http://flexboxgrid.com/)

### 概述
***

大家都知道，现在移动端已经可以用flex去布局了，这给我们带来了很多方便，可是一遍一遍的写flex代码也是件让人头疼的事，哦，在这里不得不说github是一个神奇的地方，里面总能找到需要的东西，开源且完美。

浏览flex项目后，发现里面自带响应式代码，布局的块也自带边框，不利于拓展。要知道现在写的代码很少见到需要响应式的了。于是我改了点代码结果如下：

```javascript
.row {
	box-sizing: border-box;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-flex: 0;
	-ms-flex: 0 1 auto;
	flex: 0 1 auto;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-direction: row;
	flex-direction: row;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;

}

.row.reverse {
	-webkit-box-orient: horizontal;
	-webkit-box-direction: reverse;
	-ms-flex-direction: row-reverse;
	flex-direction: row-reverse
}

.col.reverse {
	-webkit-box-orient: vertical;
	-webkit-box-direction: reverse;
	-ms-flex-direction: column-reverse;
	flex-direction: column-reverse
}

.col-xs,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9,.col-xs-offset-0,.col-xs-offset-1,.col-xs-offset-10,.col-xs-offset-11,.col-xs-offset-12,.col-xs-offset-2,.col-xs-offset-3,.col-xs-offset-4,.col-xs-offset-5,.col-xs-offset-6,.col-xs-offset-7,.col-xs-offset-8,.col-xs-offset-9 {
	box-sizing: border-box;
	-webkit-box-flex: 0;
	-ms-flex: 0 0 auto;
	flex: 0 0 auto;

}

.col-xs {
	-webkit-box-flex: 1;
	-ms-flex-positive: 1;
	flex-grow: 1;
	-ms-flex-preferred-size: 0;
	flex-basis: 0;
	max-width: 100%
}

.col-xs-1 {
	-ms-flex-preferred-size: 8.33333333%;
	flex-basis: 8.33333333%;
	max-width: 8.33333333%
}

.col-xs-2 {
	-ms-flex-preferred-size: 16.66666667%;
	flex-basis: 16.66666667%;
	max-width: 16.66666667%
}

.col-xs-3 {
	-ms-flex-preferred-size: 25%;
	flex-basis: 25%;
	max-width: 25%
}

.col-xs-4 {
	-ms-flex-preferred-size: 33.33333333%;
	flex-basis: 33.33333333%;
	max-width: 33.33333333%
}

.col-xs-5 {
	-ms-flex-preferred-size: 41.66666667%;
	flex-basis: 41.66666667%;
	max-width: 41.66666667%
}

.col-xs-6 {
	-ms-flex-preferred-size: 50%;
	flex-basis: 50%;
	max-width: 50%
}

.col-xs-7 {
	-ms-flex-preferred-size: 58.33333333%;
	flex-basis: 58.33333333%;
	max-width: 58.33333333%
}

.col-xs-8 {
	-ms-flex-preferred-size: 66.66666667%;
	flex-basis: 66.66666667%;
	max-width: 66.66666667%
}

.col-xs-9 {
	-ms-flex-preferred-size: 75%;
	flex-basis: 75%;
	max-width: 75%
}

.col-xs-10 {
	-ms-flex-preferred-size: 83.33333333%;
	flex-basis: 83.33333333%;
	max-width: 83.33333333%
}

.col-xs-11 {
	-ms-flex-preferred-size: 91.66666667%;
	flex-basis: 91.66666667%;
	max-width: 91.66666667%
}

.col-xs-12 {
	-ms-flex-preferred-size: 100%;
	flex-basis: 100%;
	max-width: 100%
}

.col-xs-offset-0 {
	margin-left: 0
}

.col-xs-offset-1 {
	margin-left: 8.33333333%
}

.col-xs-offset-2 {
	margin-left: 16.66666667%
}

.col-xs-offset-3 {
	margin-left: 25%
}

.col-xs-offset-4 {
	margin-left: 33.33333333%
}

.col-xs-offset-5 {
	margin-left: 41.66666667%
}

.col-xs-offset-6 {
	margin-left: 50%
}

.col-xs-offset-7 {
	margin-left: 58.33333333%
}

.col-xs-offset-8 {
	margin-left: 66.66666667%
}

.col-xs-offset-9 {
	margin-left: 75%
}

.col-xs-offset-10 {
	margin-left: 83.33333333%
}

.col-xs-offset-11 {
	margin-left: 91.66666667%
}

.start-xs {
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
	text-align: start
}

.center-xs {
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	text-align: center
}

.end-xs {
	-webkit-box-pack: end;
	-ms-flex-pack: end;
	justify-content: flex-end;
	text-align: end
}

.top-xs {
	-webkit-box-align: start;
	-ms-flex-align: start;
	align-items: flex-start
}

.middle-xs {
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center
}

.bottom-xs {
	-webkit-box-align: end;
	-ms-flex-align: end;
	align-items: flex-end
}

.around-xs {
	-ms-flex-pack: distribute;
	justify-content: space-around
}

.between-xs {
	-webkit-box-pack: justify;
	-ms-flex-pack: justify;
	justify-content: space-between
}

.first-xs {
	-webkit-box-ordinal-group: 0;
	-ms-flex-order: -1;
	order: -1
}

.last-xs {
	-webkit-box-ordinal-group: 2;
	-ms-flex-order: 1;
	order: 1
}

```

***
**值得说的是这现在成了一个对水平方向友好的flex框架，类似bootstrap grid**

### 让我们来体验下吧

#### 简单的例子

宽是被分成12份，我们只需要用类名来写flex就可以

    <div class="row">
        <div class="col-xs-12">
            <div class="box">12</div>
        </div>
    </div>

#### 向右偏移

    <div class="row">
        <div class="col-xs-offset-3 col-xs-9">
            <div class="box">offset</div>
        </div>
    </div>
#### 宽度自适应

    <div class="row">
        <div class="col-xs">
            <div class="box">auto</div>
        </div>
    </div>
#### 嵌套

    <div class="row">
        <div class="col-xs">
            <div class="box">
                <div class="row">
                    <div class="col-xs">
                        <div class="box">auto</div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
#### 对齐方式

**左对齐 .start-**

    <div class="row start-xs">
        <div class="col-xs-6">
            <div class="box">
                start
            </div>
        </div>
    </div>
**居中对齐 .center-**

    <div class="row center-xs">
        <div class="col-xs-6">
            <div class="box">
                center
            </div>
        </div>
    </div>
**右对齐 .start-**

    <div class="row end-xs">
        <div class="col-xs-6">
            <div class="box">
                end
            </div>
        </div>
    </div>
**上对齐 .top-**

    <div class="row top-xs">
        <div class="col-xs-6">
            <div class="box">
                top
            </div>
        </div>
    </div>
**垂直居中对齐 .middle-**

    <div class="row middle-xs">
        <div class="col-xs-6">
            <div class="box">
                middle
            </div>
        </div>
    </div>
**底部对齐 .bottom-**

    <div class="row bottom-xs">
        <div class="col-xs-6">
            <div class="box">
                bottom
            </div>
        </div>
    </div>

#### 子元素排列方式

**.around-**

    <div class="row around-xs">
        <div class="col-xs-2">
            <div class="box">
                around
            </div>
        </div>
        <div class="col-xs-2">
            <div class="box">
                around
            </div>
        </div>
        <div class="col-xs-2">
            <div class="box">
                around
            </div>
        </div>
    </div>
**.between-**

    <div class="row between-xs">
        <div class="col-xs-2">
            <div class="box">
                between
            </div>
        </div>
        <div class="col-xs-2">
            <div class="box">
                between
            </div>
        </div>
        <div class="col-xs-2">
            <div class="box">
                between
            </div>
        </div>
    </div>

**这个flex已经可以基本解决移动布局**

