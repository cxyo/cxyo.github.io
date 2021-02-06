---
title: 前端实战案例之王者荣耀皮肤抽奖
date: 2021-01-31 03:19:25
tags:
- 前端实战案例之王者荣耀皮肤抽奖
categories:
- 前端实战案例之王者荣耀皮肤抽奖
---

# **前端实战案例之王者荣耀皮肤抽奖（零基础入门）**

##  王者荣耀皮肤抽奖的效果展示

## 安装VSCode开发工具

##### 下载地址：https://code.visualstudio.com/Download

#### 安装插件

chinese

live server



## HTML基础_1

#### HTML

实现页面结构

以.html结尾的文件

#### CSS

实现样式布局

### JavaScript

实现交互功能

```
<!-- 申明文档类型 -->
<!DOCTYPE html>

<!-- HTML是由许多标签所组成的，如<html> -->
<html lang="en">
    <!-- 网页由两部分组成：头部、主题 -->
    <head>
        <!-- 指定字符编码，UTF-8是国际通用编码 -->
        <meta charset="UTF-8">
        <!-- 指定网页的标题 -->
        <title>我的第一个网页</title>
    </head>
    <!-- 指定文档的所有内容（文本、超链接、图像、表格、列表） -->
    <body>
        欢迎来到我的网站！
    </body>
</html>
```



## HTML基础_2

```
<!-- 申明文档类型 -->
<!DOCTYPE html>

<!-- HTML是由许多标签所组成的，如<html> -->
<html lang="en">
    <!-- 网页由两部分组成：头部、主题 -->
    <head>
        <!-- 指定字符编码，UTF-8是国际通用编码 -->
        <meta charset="UTF-8">
        <!-- 指定网页的标题 -->
        <title>我的第一个网页</title>

        <!-- 引用CSS样式文件 -->
        <link rel="stylesheet" href="css/demo.css">
    </head>
    <!-- 指定文档的所有内容（文本、超链接、图像、表格、列表） -->
    <body>
        
        <!-- 标题标签 -->


        <!-- 图像标签 -->
        <img src="images/1.png">
        <img src="images/2.png">
        <img src="images/3.png">
        <img src="images/4.png">
        <img src="images/cj.png">
        <img src="images/5.png">
        <img src="images/6.png">
        <img src="images/7.png">
        <img src="images/8.png">
    </body>
</html>
```

css

```
/* CSS样式文件，用于对网页进行修饰 */

body{
    /*设置全局背景颜色为红色*/
    /* background: red; */
    /*设置背景图片  no-repeat(不重复)*/
    background: url(../images/bj.png) no-repeat;
    /* 设置背景全屏 */
    background-size: 100%;
}
```



## CSS基础_1

自定义样式

```
/* 自定义样式，以.号开头，成为类选择器 */
.hdsm{
    font-size: 120%;
    color: rgb(245, 238, 238);
}
```

html

```
<h2 class="hdsm">【活动规则】</h2>
```

```
<!-- 申明文档类型 -->
<!DOCTYPE html>

<!-- HTML是由许多标签所组成的，如<html> -->
<html lang="en">
    <!-- 网页由两部分组成：头部、主题 -->
    <head>
        <!-- 指定字符编码，UTF-8是国际通用编码 -->
        <meta charset="UTF-8">
        <!-- 指定网页的标题 -->
        <title>重磅</title>

        <!-- 引用CSS样式文件 -->
        <link rel="stylesheet" href="css/demo.css">
    </head>
    <!-- 指定文档的所有内容（文本、超链接、图像、表格、列表） -->
    <body>

        <!-- 图像标签 -->
        <div align="center"><!--居中，距离顶部500-->
            <img src="images/1.png">
            <img src="images/2.png">
            <img src="images/3.png">
            <img src="images/4.png">
            <img src="images/cj.png">
            <img src="images/5.png">
            <img src="images/6.png">
            <img src="images/7.png">
            <img src="images/8.png">
        </div>

        <!-- 标题标签 -->
        <h1>活   动      说     明</h1>
        <!-- 通过class调用类选择器 -->
        <h2 class="hdsm">【活动规则】</h2>
        <h4 class="hdsm">每人有一次抽奖机会</h4>
        <h4 class="hdsm">本次奖励名额有限，请严格按照要求参与！如发现有作弊、</h4>
        <h4 class="hdsm">攻击行为、将收回奖品、清空账户或封号处理。</h4>
        <h2 class="hdsm">【活动奖励】</h2>
        <h4 class="hdsm">白蛇-大乔</h4>
        <h4 class="hdsm">遇见神鹿-瑶</h4>
        <h4 class="hdsm">天鹅之梦-小乔</h4>
        <h4 class="hdsm">全息碎影-孙悟空</h4>
        <h4 class="hdsm">零号赤焰-孙悟空</h4>
        <h4 class="hdsm">心灵骇客-安琪拉</h4>
        <h4 class="hdsm">猫影幻舞-貂蝉</h4>
        <h4 class="hdsm">仲夏夜之梦-貂蝉</h4>
        <h2 class="hdsm">【活动时间】</h2>
        <h4 class="hdsm">2021.1.1-2021.3.31</h4>


        <h3>随机出奖，抽完即止！本活动解释权归Q官方所有</h3>

    </body>
</html>
```

```
/* CSS样式文件，用于对网页进行修饰 */

body{
    /*设置全局背景颜色为红色*/
    /* background: red; */
    /*设置背景图片  no-repeat(不重复)*/
    background: url(../images/bj.png) no-repeat;
    /* 设置背景全屏 */
    background-size: 100%;
}

div{
    height:500px
}

/* 自定义样式，以.号开头，成为类选择器 */
.hdsm{
    font-size: 120%;
    color: rgb(245, 238, 238);
}

/* 标题样式CSS样式文件，用于对标题进行修饰 */
h1{
    color: transparent;
    -webkit-text-fill-color: yellow;/*文字的填充色*/
    -webkit-text-stroke: 1.2px red;/*文字边框色*/
    font-size: 200%;/*字体大小*/
    background: rgb(219, 216, 216);/* 背景颜色 */
    width: 30%;/* 背景宽度 */
    height: 50px;/* 背景高度 */
    opacity: 0.8;/* 背景透明度 */

    text-align:center;/*文字水平居中*/
    line-height: 50px;/*文字垂直居中*/
    /*距离上下为10px，整体水平居中*/
    margin: 10px auto;

    /*height:100px;/*文字高度*/
    /*width:100%;/*文字宽度*/
}

/* 底部样式CSS样式文件，用于对标题进行修饰 */
h3{
    font-size: 100%;/*字体大小*/
    color: rgb(245, 238, 238);/*字体颜色*/
    background: rgb(10, 10, 10);/* 背景颜色 */
    width: 100%;/* 背景宽度 */
    height: 50px;/* 背景高度 */
    opacity: 0.7;/* 背景透明度 */

    text-align:center;/*文字水平居中*/
    line-height: 50px;/*文字垂直居中*/
    /*距离上下为10px，整体水平居中*/
    margin: 10px auto;
}
```



## CSS基础_2

相对位置，绝对位置

```
/* 九宫格分区样式，以.号开头，成为类选择器 */
.jiugongge{
    background: pink;
    width: 600px;
    height: 600px;
    /* 弹性盒子 */
    display: flex;
    /* 两端对齐 */
    justify-content: space-between;
    /* 相对定位 */
    position: relative;
}
.choujiang{
    /* 绝对定位 */
    position: absolute;
    /* 离上面距离 */
    top: 50%;
    /* 离左边距离 */
    left: 50%;
    /* 
    移动位置
        往左移动自身宽度的50%，使其居中水平中心的位置
        往上移动自身高度的50%，使其居于垂直中心的位置
    */
    transform: translate(-50%,-50%);
    /* 不透明度 */
    opacity: 0.8;
}
```

css

```
/* CSS样式文件，用于对网页进行修饰 */

body{
    /*设置全局背景颜色为红色*/
    /* background: red; */
    /*设置背景图片  no-repeat(不重复)*/
    background: url(../images/bj.png) no-repeat;
    /* 设置背景全屏 */
    background-size: 100%;
}

/* 活动说明自定义样式，以.号开头，成为类选择器 */
.hdsm{
    font-size: 120%;
    color: rgb(245, 238, 238);
}

/* 九宫格分区样式，以.号开头，成为类选择器 */
.jiugongge{
    background: pink;
    width: 600px;
    height: 600px;
    /* 弹性盒子 */
    display: flex;
    /* 两端对齐 */
    justify-content: space-between;
    /* 相对定位 */
    position: relative;
}
.choujiang{
    /* 绝对定位 */
    position: absolute;
    /* 离上面距离 */
    top: 50%;
    /* 离左边距离 */
    left: 50%;
    /* 
    移动位置
        往左移动自身宽度的50%，使其居中水平中心的位置
        往上移动自身高度的50%，使其居于垂直中心的位置
    */
    transform: translate(-50%,-50%);
    /* 不透明度 */
    opacity: 0.8;
}




/* 标题样式CSS样式文件，用于对标题进行修饰 */
h1{
    color: transparent;
    -webkit-text-fill-color: yellow;/*文字的填充色*/
    -webkit-text-stroke: 1.2px red;/*文字边框色*/
    font-size: 200%;/*字体大小*/
    background: rgb(219, 216, 216);/* 背景颜色 */
    width: 30%;/* 背景宽度 */
    height: 50px;/* 背景高度 */
    opacity: 0.8;/* 背景透明度 */

    text-align:center;/*文字水平居中*/
    line-height: 50px;/*文字垂直居中*/
    /*距离上下为10px，整体水平居中*/
    margin: 10px auto;

    /*height:100px;/*文字高度*/
    /*width:100%;/*文字宽度*/
}

/* 底部样式CSS样式文件，用于对标题进行修饰 */
h3{
    font-size: 100%;/*字体大小*/
    color: rgb(245, 238, 238);/*字体颜色*/
    background: rgb(10, 10, 10);/* 背景颜色 */
    width: 100%;/* 背景宽度 */
    height: 50px;/* 背景高度 */
    opacity: 0.7;/* 背景透明度 */

    text-align:center;/*文字水平居中*/
    line-height: 50px;/*文字垂直居中*/
    /*距离上下为10px，整体水平居中*/
    margin: 10px auto;
}
```

html

```
<!-- 申明文档类型 -->
<!DOCTYPE html>

<!-- HTML是由许多标签所组成的，如<html> -->
<html lang="en">
    <!-- 网页由两部分组成：头部、主题 -->
    <head>
        <!-- 指定字符编码，UTF-8是国际通用编码 -->
        <meta charset="UTF-8">
        <!-- 指定网页的标题 -->
        <title>重磅</title>

        <!-- 引用CSS样式文件 -->
        <link rel="stylesheet" href="css/demo.css">
    </head>
    <!-- 指定文档的所有内容（文本、超链接、图像、表格、列表） -->
    <body>

        <!-- 分区标签，用来进行区域划分 -->
        <div class="jiugongge">
            <!-- 图像标签 -->
            <div class="jianpin"><img src="images/1.png"></div>
            <div class="jianpin"><img src="images/2.png"></div>
            <div class="jianpin"><img src="images/3.png"></div>
            <div class="jianpin"><img src="images/4.png"></div>
            <div class="choujiang"><img src="images/cj.png"></div>
            <div class="jianpin"><img src="images/5.png"></div>
            <div class="jianpin"><img src="images/6.png"></div>
            <div class="jianpin"><img src="images/7.png"></div>
            <div class="jianpin"><img src="images/8.png"></div>
        </div>


        <!-- 标题标签 -->
        <h1>活   动      说     明</h1>
        <!-- 通过class调用类选择器 -->
        <h2 class="hdsm">【活动规则】</h2>
        <h4 class="hdsm">每人有一次抽奖机会</h4>
        <h4 class="hdsm">本次奖励名额有限，请严格按照要求参与！如发现有作弊、</h4>
        <h4 class="hdsm">攻击行为、将收回奖品、清空账户或封号处理。</h4>
        <h2 class="hdsm">【活动奖励】</h2>
        <h4 class="hdsm">白蛇-大乔</h4>
        <h4 class="hdsm">遇见神鹿-瑶</h4>
        <h4 class="hdsm">天鹅之梦-小乔</h4>
        <h4 class="hdsm">全息碎影-孙悟空</h4>
        <h4 class="hdsm">零号赤焰-孙悟空</h4>
        <h4 class="hdsm">心灵骇客-安琪拉</h4>
        <h4 class="hdsm">猫影幻舞-貂蝉</h4>
        <h4 class="hdsm">仲夏夜之梦-貂蝉</h4>
        <h2 class="hdsm">【活动时间】</h2>
        <h4 class="hdsm">2021.1.1-2021.3.31</h4>


        <h3>随机出奖，抽完即止！本活动解释权归Q官方所有</h3>

    </body>
</html>
```



## 王者荣耀皮肤抽奖的页面布局_1

html

```
<!-- 申明文档类型 -->
<!DOCTYPE html>

<!-- HTML是由许多标签所组成的，如<html> -->
<html lang="en">
    <!-- 网页由两部分组成：头部、主题 -->
    <head>
        <!-- 指定字符编码，UTF-8是国际通用编码 -->
        <meta charset="UTF-8">
        <!-- 指定网页的标题 -->
        <title>重磅福利</title>

        <!-- 引用CSS样式文件 -->
        <link rel="stylesheet" href="css/index.css">
    </head>
    <!-- 指定文档的所有内容（文本、超链接、图像、表格、列表） -->
    <body>

        <!-- 分区标签，用来进行区域划分 -->
        <div class="jiugongge">
            <div class="row"><!--row行，有几行就写几个div-->
                <!-- 图像标签 -->
                <!-- 多个样式，空格隔开 -->
                <div class="item current"><img src="images/1.png"></div>
                <div class="item"><img src="images/2.png"></div>
                <div class="item"><img src="images/3.png"></div>
            
            </div>
            <div class="row">
                <div class="item"><img src="images/4.png"></div>
                <div class="item"><img src="images/5.png"></div>
            
            </div>
            <div class="row">
                <div class="item"><img src="images/6.png"></div>
                <div class="item"><img src="images/7.png"></div>
                <div class="item"><img src="images/8.png"></div>
            </div>
        </div>

    </body>
</html>
```

css

```
/* 主体设置背景 */
body{
    background:url(../images/bj.png) no-repeat;/* 背景 no-repeat不需要重复 */
    background-size: 100%;
}
/* 九宫格样式 */
.jiugongge{
    background:url(../images/jgg.png) no-repeat;/* 背景 no-repeat不需要重复 */
    width: 600px;/* 宽度 */
    height: 600px;/* 高度 */
    margin: 60% auto;/* 上下距离，左右自动 */
}
/* 弹性盒子 */
.row{
    display: flex;/* 同一行展示 */
    justify-content: space-between;/* 平均对齐 */
}

/* 只有每个皮肤半透明 */
.item{
    /* 不透明度 */
    opacity: 0.6;
}
/* 选中的皮肤样式 */
.current{
    opacity: 1;
}
```



## 王者荣耀皮肤抽奖的页面布局_2

## JavaScript基础_1

js

```
//js脚本文件，用来实现交互功能

/**
 * 定义变量
 */
 var name = 'tom';
 var age = 18;
 age++;// 自增1

//  把数据输出到控制台
console.log(name);
console.log(age);


/**
 * 条件判断
 */ 
if(age>=18){
    console.log("您已成年");
}else{
    console.log("您未成年");
}

/**
 * 数组：一组数据
 */
var names = ['唐伯虎',"秋香","石榴姐"];

/**
 * 循环
 */
for(var name of names){
    console.log(name);
}
```

html

```
<!-- 引用js脚本文件 -->
<script src="js/index.js"></script>
```



## JavaScript基础_2

函数

```
/**
 * 定义函数
 */
function print(){
    console.log(name);
    console.log(age);
}
// 调用函数
print();
//多次调用函数
print();

/**
 * 生成随机数
 */
var x = Math.random();//生成一个[0,1)之间的随机数
    var x = parseInt(Math.random()*100+1)//取1-100的随机数//arseInt取整，把后面砍掉
console.log(x);
```

计数器

```
/**
 * 计时器
 */
setInterval(function(){
    console.log(name);
    console.log(age);
},500);//单位为毫秒

/**
 * 按钮
 */
function start(){
    console.log("呵呵");
}

/**
 * 点按钮自增加
 */
var i = 1;
function start(){
    setInterval(function(){
        console.log("嘿嘿"+i);
        i++;
    },500);
}

/**
 * 得到计时器
 */
var i = 1;
function start(){
    var timer = setInterval(function(){
        console.log("嘿嘿"+i);
        i++;
        // 当i大于20时，停止计时器
        if(i>20){
            clearInterval(timer);
            console.log("计时器已停止");
        }
    },500);
}
```

html

```
<div class="btn">抽 奖</div>
            <button onclick="start()">开始</button>
```



## JavaScript基础_3

## JavaScript基础_4

页面dom操作

js

```
/**
 * 页面DOM操作
 */
function change(){
    // 1、获取页面标签
    var hello = document.getElementById("hello");
    console.log(hello.classList);
    hello.classList.add("a3");
    hello.classList.remove("a1");
    // 根据类名，同时操作
    var items = document.getElementsByClassName('aaa');
    for(var item of items){
        item,classList.add("a2");
    }
}
```



## 王者荣耀皮肤抽奖的功能实现

