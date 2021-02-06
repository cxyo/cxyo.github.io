---
title: picgo图床
date: 2021-01-31 00:47:57
tags:
- picgo图床
categories:
- picgo图床
---

# PicGo+jsDelivr+GitHub搭建免费图床，Typora使用图床

***1\***|***0\*****Github配置**

首先，创建一个GitHub账号

然后添加一个仓库

[![image-20201122224130915](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122224131.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122224131.png)

[![image-20201122224954815](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122224954.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122224954.png)

创建完后点头像，Setting

[![image-20201122225137600](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225137.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225137.png)

然后点击Developer settings

[![image-20201122225451304](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225451.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225451.png)

然后点击Personal access tokens

[![image-20201122225540312](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225540.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225540.png)

点击Generate new token

[![image-20201122225847303](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225847.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122225847.png)

创建一个token

起个名字

勾选repo即可，当然也可以全勾选上

[![image-20201122230437466](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122230437.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122230437.png)

[![image-20201122230946737](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122230946.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122230946.png)

[![image-20201122231214751](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122231214.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122231214.png)

***2\***|***0\*****PicGo配置**

项目地址：[Molunerfinn/PicGo: A simple & beautiful tool for pictures uploading built by vue-cli-electron-builder (github.com)](https://github.com/Molunerfinn/PicGo)

项目使用文档：[快速上手 | PicGo](https://picgo.github.io/PicGo-Doc/zh/guide/getting-started.html)

PicGo.exe的安装包链接：https://share.weiyun.com/VfeEM4EC 密码：e5iv76

使用方法：

[![image-20201122232242059](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122232242.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122232242.png)

关于设定分支名，之前我一直写的master，因为默认应该就是这个，但是我的GitHub默认不是

查看自己的分支名方法：打开你创建的仓库

[![image-20201122232607702](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122232607.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122232607.png)

***3\***|***0\*****jsDelivr配置**

[jsDelivr - A free, fast, and reliable CDN for open source](https://www.jsdelivr.com/)

[![image-20201122233441228](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233441.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233441.png)

在PicGo中，设定自定义域名填写：

```
https://cdn.jsdelivr.net/gh/用户名/仓库名@分支名
```

然后就可以cdn加速GitHub的图片了

***4\***|***0\*****PicTo上传图片**

[![image-20201122233857468](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233857.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233857.png)

上传后可以选择链接格式，



```
URL格式：https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201121194112.png
md格式：![20201121194112](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201121194112.png)
```

[![20201121194112](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201121194112.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201121194112.png)

设置建议开启这两个：

[![image-20201122233935865](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233935.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233935.png)

插件建议安装这一个，增强的Github上传功能，可以同步删除仓库的图片

安装插件好像需要Node.js环境

[![image-20201122233954907](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233954.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122233954.png)

***5\***|***0\*****Typora使用图床的配置**

[![image-20201122234553921](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122234554.png)](https://cdn.jsdelivr.net/gh/yanhua-tj/ImgPicGo@main/img/20201122234554.png)

然后在Typora中写markdown时就可以直接复制图片进来，然后PicGo就会弹出上传图片，返回一个图片URL



# 取代 七牛云+Mpic 方案

写在前面

> 我以前用的 `七牛云 + Mpic` 的组合，后来由于七牛云测试域名收回，我的图床就废了。以前的好多图片都埋藏在七牛云的服务器上，又气又难过。思考好一段时间，想自己搭服务，但成本有点高，备案的域名 + 服务器一年几百块。对于我这种不靠写字谋生的人而言没有必要，所以就停摆了一段时间。直到今天用 GitHub 搭起了图床，可以说非常开心了。所以跟大家分享一下。

- 方便程度：★★★★☆
- 配置难度：★★☆☆☆
- 适用环境：win + mac + linux
- 需要工具：GitHub 账号 + PicGo 客户端
- 稳定性：背靠 GitHub 和微软，比自建服务器都稳
- 隐私性：这算是唯一缺点，你的图片别人可以访问

## 1. GitHub 仓库设置

> 流程：新建 public 仓库 -> 创建 token -> 复制 token 备用

### 1.1 新建仓库

点击 git 主页右上角的 `+` 创建 `New repository`；

[外链图片转存失败(img-rEdiLVp3-1565792053166)(https://raw.githubusercontent.com/yefcion/PicData/master/img/20190311222018.png)]

填写仓库信息，例如我就创建了一个 `cloudimg` 的仓库。这里注意，仓库得设置为 `Public` 因为后面通过客户端访问算是外部访问，因此无法访问 `Private` ，这样的话图片传上来之后只能存储不能显示。所以要设置为 `Public`。

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzIwMTkwMzExMjIyNTE0LnBuZw)

### 1.2 创建 token 并复制保存

此时仓库已经建立，点击右上角头像，然后进入设置；

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzIwMTkwMzExMjIyOTI1LnBuZw)

在页面最下找到 `Developer settings`，点击进入；

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzE1NTIzMTQ2OTEyMzIucG5n)

创建 token；
![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzIwMTkwMzExMjIzMzE3LnBuZw?x-oss-process=image/format,png)
填 description（也是随心填），勾选复选框 repo ，接着到页面底部 `Generate token` 就完成了；

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzE1NTIzMTQ5MDc3OTQucG5n?x-oss-process=image/format,png)

然后复制生成一串字符 token，这个 token 只出现一次，所以要保存一下（我一般记在微信收藏）。

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzIwMTkwMzExMjIzOTAxLnBuZw)

## 2. PicGo 客户端配置

### 2.1 下载&安装

PicGo （目前 2.0.4）是一个开源的图床工具，非常优秀。可以到 git 上下载，但下载速度太慢，所以我放了一个百度云的链接，速度快很多。

git地址：[PicGo](https://github.com/Molunerfinn/PicGo)

Win版下载链接：[百度云](https://pan.baidu.com/s/17KycPMoqNCnc1cR_yQO8nQ) 密码：PicG

### 2.2 配置

先上图

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzIwMTkwMzExMjI0NDQzLnBuZw)

- 仓库名 即你的仓库名
- 分支名 默认 `master`
- Token 就是刚刚复制的那一串字符
- 存储路径 这个可以填也可以不填，填了的话图片就上传到 git 中 `data` 这个文件夹
- 域名 `https://raw.githubusercontent.com/yefcion/cloudimg/master`这个要改一下 格式 `https://raw.githubusercontent.com/[username]/[仓库名]/master`

然后点确定就可以了。

> 注：这里提供一个加速访问图片的方法：CDN加速，具体原理自行百度（我还不是很懂）
> 将上面的域名改为：
> 原 https://raw.githubusercontent.com/yefcion/cloudimg/master
> 现 https://cdn.jsdelivr.net/gh/yefcion/cloudimg@master

然后关于上传的快捷键设置。默认的是 Mac 按键，推荐改成 `Ctrl + alt +c`。

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3llZmNpb24vUGljRGF0YS9tYXN0ZXIvaW1nLzIwMTkwMzExMjI0OTM1LnBuZw)

综上，操作完成。

本方案唯一缺点，不能私人。但是考虑到 GitHub 上传的图在列表里没法预览，应该没人会闲着没事翻记录。