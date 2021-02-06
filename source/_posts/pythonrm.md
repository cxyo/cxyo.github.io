---
title: python编程从入门到实践
date: 2021-01-31 02:53:30
tags:
- python编程从入门到实践
categories:
- python编程从入门到实践
---

# 第一部分 基础知识

## 第一章 起步

### 1.1 搭建编程环境

#### 1.1.1 python2和python3

建议使用python3

#### 1.1.2 运行python代码片段

`print("Hello Python interpreter!")`

#### 1.1.3 hello world程序

`print("Hello world!")`

### 1.2 在不同操作系统中搭建python编程环境

#### 1.2.1 在linux系统中搭建python编程环境

##### 1.检查python版本

###### 运行Terminal（ububtu系统，快捷键（Ctrl+Alt+T））

输入 `python`

###### 退出

快捷键（Ctrl+D）输入`exit()`

###### python3版本

输入`python3`

##### 2.安装文本编辑器

`sudo apt-get install geany`

##### 3.运行Hello World程序

`print("Hello Python world!")`

##### 4.在终端会话中运行Python代码

###### 打开命令窗口输入 `python`

`print("Hello Python interpreter!")`

###### 关闭

快捷键（Ctrl+D）输入`exit()`

#### 1.2.2 在OS X系统中搭建python编程环境

##### 1.检查是否安装了Python

###### 在文件夹Applications/Utilities中选择Terminal,打开终端，或按Command+空格键，再输入terminal回车

输入 `python`

##### 2.在终端会话中运行Python代码

`print("Hello Python interpreter!")`

##### 3.安装文本编辑器

[下载地址](http://sublimetext.com/3)

##### 4.配置Sublime Text使其使用Python3

###### 查找python完整路径命令

`type -a python3`

###### 修改路径

启动Sublime Text，选择tools/build system/new build system，删除配置文件内容，输入以下内容

```
{
	"cmd":["/usr/local/bin/python3","-u","$file"],
}
```

将配置文件命名为Python3.sublime-build,并将其保存到默认目录

##### 5.运行Hello World程序

###### 打开Sublime Text

`print("Hello Python world!")`

#### 1.2.3 在windows系统中搭建python编程环境

##### 1.安装python

[下载地址](http://pyton.org/downloads/)

##### 2.启动python终端会话

###### win键+r，输入“cmd”，回车

输入 `python`

##### 3.在终端会话中运行python

`print("Hello Python world!")`

##### 4.安装文本编辑器

###### Geany [下载地址](http://geany.org)

打开输入

`print("Hello Python world!")`

##### 5.配置Geany

##### 6.运行Hello World程序

### 1.3 解决安装问题

### 1.4 从终端运行python程序

#### 1.4.1 在linux和OS X 系统中从终端运行python程序

`cd Desktop/python_work/`

`ls`

`python hello_world.py`

#### 1.4.2 在windows系统中从终端运行python程序

`cd Desktop\python_work`

`dir`

`python hello_world.py`

### 1.5 小结

## 第二章 变量和简单数据类型

## 第三章 列表简介

## 第四章 操作列表

## 第五章 if语句

## 第六章 字典

## 第七章 用户输入和while循环

## 第八章 函数

## 第九章 类

## 第十章 文件和异常

## 第十一章 测试代码

# 第二部分 项目

## 项目一 外星人入侵

### 第十二章 武装飞船

### 第十三章 外星人

### 第十四章 记分

## 项目二 数据可视化

### 第十五章 生成数据

## 第十六章 下载数据

### 第十七章 使用API

## 项目三 web应用程序

### 第十八章 django入门

### 第十九章 用户账户

### 第二十章 设置应用程序的样式并对其进行部署