---
layout:     post
title:      "markdown语法初体验"
subtitle:   "学习使我快乐"
date:       2018-08-01 12:00:00
author:     "Yao Shengli"
header-img: "img/post-bg-nextgen-web-pwa.jpg"
header-mask: 0.3
catalog:    true
tags:
    - 知识学杂   
---

## markdown 语法

### 概述
***
**宗旨**

Markdown 的目标是实现「易读易写」.

可读性，无论如何，都是最重要的。一份使用 Markdown 格式撰写的文件应该可以直接以纯文本发布，并且看起来不会像是由许多标签或是格式指令所构成。Markdown 语法受到一些既有 text-to-HTML 格式的影响，包括 [Setext](http://docutils.sourceforge.net/mirror/setext.html)、[atx](http://www.aaronsw.com/2002/atx/)、[Textile](http://textism.com/tools/textile/)、[reStructuredText](http://docutils.sourceforge.net/rst.html)、[Grutatext](http://www.triptico.com/software/grutatxt.html) 和 [EtText](http://ettext.taint.org/doc/)，而最大灵感来源其实是纯文本电子邮件的格式。

**兼容HTML**

例子如下，在Markdown文件里加上一段HTML表格：

<table>
    <tr>
        <td>name</td>
    </tr>
    <tr>
        <td>Yao Shengli</td>
    </tr>
</table>

### 区块元素
***
**段落和换行**

一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行（空行的定义是显示上看起来像是空的，便会被视为空行。比方说，若某一行只包含空格和制表符，则该行也会被视为空行）。普通段落不该用空格或制表符来缩进。

**标题**

类 Atx 形式则是在行首插入 1 到 6 个 # ，对应到标题 1 到 6 阶，例如：

    # 这是 H1
    ## 这是 H2
    ###### 这是 H6

**区块引用**

Markdown 标记区块引用是使用类似 email 中用 > 的引用方式。如果你还熟悉在 email 信件中的引言部分，你就知道怎么在 Markdown 文件中建立一个区块引用，那会看起来像是你自己先断好行，然后在每行的最前面加上 > ：、

    >这就是区块引用
    >这也是

Markdown 也允许你偷懒只在整个段落的第一行最前面加上 > ：

    >这样写也行
    也行
    >还真有意思
    啊

引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等：

    > ## 这是一个标题。
    > 
    > 1.   这是第一行列表项。
    > 2.   这是第二行列表项。
    > 
    > 给出一些例子代码：
    > 
    >   return shell_exec("echo $input | $markdown_script");

**列表**

Markdown 支持有序列表和无序列表。

    * red
    * green
    * blue

有序列表则使用数字接着一个英文句点

    1. red
    2. green
    3. blue

**代码区块**

要在 Markdown 中建立代码区块很简单，只要简单地缩进 4 个空格或是 1 个制表符就可以，例如，下面的输入：

    这是一个普通的锻炼
        这是一个代码区块

**分隔线**

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

    * * *
    ***
    *****
    - - -
    ------------------

### 区段元素
***

**链接**

    [链接名字](链接地址)

**强调**

    **强调**

**代码**

如果要标记一小段行内代码，你可以用反引号把它包起），例如：

    `printf()`

`printf()`测试

如果要在代码区段内插入反引号，你可以用多个反引号来开启和结束代码区段：

    ``function a(){
        console.log("hellow")
    }``
    
```javascript
function a(){
        console.log("hellow")
    }
```

**图片**

    ![Alt text](/path/to/img.jpg)

![](/img/avatar-hux-ny.jpg)