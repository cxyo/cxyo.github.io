---
title: 安装Node教程
date: 2021-01-31 00:45:03
tags:
- node
- 安装Node教程
categories:
- node
- 安装Node教程
---

# windows安装NodeJS的操作系统

# 下载NodeJs安装包



首先在NodeJS官方网址(https://nodejs.org/)下载安装包，NodeJS官网会自动根据电脑操作系统下载适应于本系统的安装包。



![image-20201016120039882](https://i.loli.net/2020/10/16/dLjskUpt285oizQ.png)



# 开始安装



双击安装文件，开始安装

第一步:Welcome to the Node.js Setup Wizard（欢迎来到Node.js安装向导）
![image-20201016114908389](https://i.loli.net/2020/10/16/OwGgIqZrvTCNE34.png)

第二步:End-User license Agreement（终端用户许可协议）
![image-20201016114948423](https://i.loli.net/2020/10/16/R3DiAdvc4qGCuna.png)

第三步:Destination folder（目标文件夹）选择安装目录
![image-20201016115025328](https://i.loli.net/2020/10/16/VN1ijpBn2swO6eQ.png)

第四步:Custom Setup（自定义设置）
![image-20201016115101969](https://i.loli.net/2020/10/16/S3nDqdKL9izOTj2.png)

第五步:tools for native modules(用于本机模块的一些工具)

![image-20201016115304741](https://i.loli.net/2020/10/16/rC6IncgLxYpl4NZ.png)

第六步：Ready to install Node.js（准备安装Node.js）
![image-20201016115414109](https://i.loli.net/2020/10/16/27DN9ytHJZMeFci.png)

第七步: Installing Node.js（安装Node.js）

![image-20201016115512686](https://i.loli.net/2020/10/16/qBHjE45Qbpv6CaW.png)

第八步:Completed the Node.js Setup Wizard（完成了Node.js安装向导）

![image-20201016115702770](https://i.loli.net/2020/10/16/OLmYrSsyQejpgCb.png)

第九步:查看安装路径
![image-20201016115821541](https://i.loli.net/2020/10/16/6gC5mOJNAyvdL1c.png)



# 测试NodeJS是否安装成功



第九步:Window+R 打开运行窗口，输入cmd命令

![image-20201016120224873](https://i.loli.net/2020/10/16/DxtwUfRW2bAT3vE.png)

第十步:输入node，敲回车

![image-20201016121029615](https://i.loli.net/2020/10/16/u1rgwleGBi3t9Vs.png)

安装时已经自动配置了环境变量，所以我们可以直接输入node敲回车即可进入node.Js交互模式。

第十一步:输入打印信息，安装成功
![img](https://img-blog.csdn.net/20150830125023940?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



# 运行NodeJs的Http模块

第十二步:在G盘下创建一个文件夹：G:\nodeJS_App，然后在文件夹下新建一个文件：nodeJs_test.js



把下面代码考进文件中：



```javascript
var http = require("http"); // http 模块



   



http.createServer(function(req, res) {



  res.writeHead( 200 , {"Content-Type":"text/html"});



  res.write("<h1>Node.js</h1>");



  res.write("<p>Hello World</p>");



  res.end("<p>beyondweb.cn</p>");



}).listen(3000); // 监听端口3000



 



console.log("HTTP server is listening at port 3000."); //在CMD中打印日志
```


第十三步:打开CMD命令窗口，通过DOS窗口进入你的nodeJS_App的文件夹



通过DOS窗口进入你的nodeJS_App的文件夹，在命令窗口执行【node nodeJs_test.js】然后这时会显示：HTTP server is listening at port 3000.



![img](https://img-blog.csdn.net/20150830125555353?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



访问网址[http://127.0.0.1:3000](http://127.0.0.1:3000/)。

![img](https://img-blog.csdn.net/20150830130023128?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



如果能显示下图，恭喜您NodeJS环境安装成功了.