---
title: hexo
date: 2021-01-31 00:45:25
tags:
- hexo
- hexo安装
- hexo部署
categories:
- hexo
- hexo安装
- hexo部署
---

#### hexo安装

1、安装git

2、安装nodejs

前提必须安装好git和nodejs，可以输入下面命令检查下有没有安装成功

`git --version`

`node -v`

`npm -v`



![image-20201016150552318](https://i.loli.net/2020/10/16/x4ukYIHLOpPC8RT.png)

3、用 npm 安装话经常出现卡住而导致无法正常安装，解决办法就是修改 npm 的安装源，这里选择淘宝 NPM 镜像，这是一个完整 npmjs.org 镜像，你可以用此代替官方版本，同步频率目前为 10分钟 一次以保证尽量与官方服务同步。



```cpp
npm config set registry https://registry.npm.taobao.org
```

![image-20201016151835080](https://i.loli.net/2020/10/16/LAGDiFHqf3X5cOS.png)

4、安装hexo



```undefined
npm install -g hexo-cli
```



![image-20201016151931158](https://i.loli.net/2020/10/16/LWubgrRjlcYGvoi.png)

安装hexo

5、查看版本信息



```undefined
hexo -v
```

![image-20201016152049352](https://i.loli.net/2020/10/16/n2tB6kx8KFp9L7e.png)

查看版本信息

6、初始化hexo程序



```kotlin
hexo init myblog
```

（更新npm/并更换为国内的npm镜像命令：npm install npm -g/
 npm install -g cnpm --registry=[https://registry.npm.taobao.org](https://links.jianshu.com/go?to=https%3A%2F%2Fregistry.npm.taobao.org)）

![image-20201016152151641](https://i.loli.net/2020/10/16/HwSb2FUA5DlQyYK.png)

7、进入myblog文件夹



```bash
cd myblog
```

（8、`npm install`）

![image-20201016152940342](https://i.loli.net/2020/10/16/HGN7JzFQknw2cXx.png)

9、查看文件夹目录

- node_modules: 依赖包
- scaffolds：生成文章的一些模板
- source：用来存放你的文章
- themes：主题
- ** _config.yml: 博客的配置文件**

![image-20201016153041344](https://i.loli.net/2020/10/16/wTEI1g5f76pjG8H.png)

文件夹目录

10、打开hexo



```undefined
hexo g
hexo server
```

![image-20201016153156954](https://i.loli.net/2020/10/16/q492kFwU5GSWyVa.png)

打开hexo的服务后，在浏览器输入localhost:4000就可以看到你生成的博客了。

![image-20201016153405616](https://i.loli.net/2020/10/16/hVnM57T2HsELF9l.png)

## Hexo部署



# 1. GitHub创建个人仓库

首先，你先要有一个GitHub账户，去注册一个吧。

注册完登录后，在GitHub.com中看到一个New repository，新建仓库
![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstcm7ej20ei0c1aah.jpg)

创建一个和你用户名相同的仓库，[后面加.github.io](http://xn--yfr16an19l.github.io/)，只有这样，将来要部署到GitHub page的时候，才会被识别，[也就是xxxx.github.io](http://xn--xxxx-4m5f354ev5p.github.io/)，其中xxx就是你注册GitHub的用户名。我这里是已经建过了。

![image-20201016172618770](https://i.loli.net/2020/10/16/MslhtLAUuBfjzH9.png)

点击create repository。

# 5. 生成SSH添加到GitHub

回到你的git bash中，

```
git config --global user.name "cxyo"
git config --global user.email "cxyocn@163.com"
```

这里的yourname输入你的GitHub用户名，youremail输入你GitHub的邮箱。这样GitHub才能知道你是不是对应它的账户。

可以用以下两条，检查一下你有没有输对

```
git config user.name
git config user.email
```

![image-20201016173354114](https://i.loli.net/2020/10/16/XYMUcTuGNf5Vsl1.png)

然后创建SSH,一路回车

```
ssh-keygen -t rsa -C "cxyocn@163.com"
```

![image-20201019145457369](https://i.loli.net/2020/10/19/81iYAT7kI4hPueH.png)

这个时候它会告诉你已经生成了.ssh的文件夹。在你的电脑中找到这个文件夹。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstd106j20kb073gll.jpg)

ssh，简单来讲，就是一个秘钥，其中，`id_rsa`是你这台电脑的私人秘钥，不能给别人看的，`id_rsa.pub`是公共秘钥，可以随便给别人看。把这个公钥放在GitHub上，这样当你链接GitHub自己的账户时，它就会根据公钥匹配你的私钥，当能够相互匹配时，才能够顺利的通过git上传你的文件到GitHub上。

而后在GitHub的setting中，找到SSH keys的设置选项，点击`New SSH key`
把你的`id_rsa.pub`里面的信息复制进去。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstdifaj210s0gfjrz.jpg)

在gitbash中，查看是否成功

```
ssh -T git@github.com
```

![image-20201019145610010](https://i.loli.net/2020/10/19/OWRbkcp2ywCrzqS.png)

# 6. 将hexo部署到GitHub

这一步，我们就可以将hexo和GitHub关联起来，也就是将hexo生成的文章部署到GitHub上，打开站点配置文件 `_config.yml`，翻到最后，修改为
YourgithubName就是你的GitHub账户

```
deploy:
  type: git
  repo: https://github.com/cxyo/cxyo.github.io.git
  branch: master
```

这个时候需要先安装deploy-git ，也就是部署的命令,这样你才能用命令部署到GitHub。

```
npm install hexo-deployer-git --registry=https://registry.npm.taobao.org
```

![image-20201019114005485](https://i.loli.net/2020/10/19/ZJj9CyuGfMnW3Yc.png)

然后

```
hexo clean
hexo generate
hexo deploy
```

其中 `hexo clean`清除了你之前生成的东西，也可以不加。
`hexo generate` 顾名思义，生成静态文章，可以用 `hexo g`缩写
`hexo deploy` 部署文章，可以用`hexo d`缩写

注意deploy时可能要你输入username和password。

![image-20201019115802679](https://i.loli.net/2020/10/19/CFWm7Xed4wis1Db.png)

得到下图就说明部署成功了，过一会儿就可以在`http://cxyo.github.io` 这个网站看到你的博客了！！

![image-20201019150620010](https://i.loli.net/2020/10/19/KAmeRUPlisjbk8B.png)

浏览器打开网址：https://cxyo.github.io/

![image-20201019151356596](https://i.loli.net/2020/10/19/9cVxHCuALqsji8y.png)

# 7. 设置个人域名

现在你的个人网站的地址是 `yourname.github.io`，如果觉得这个网址逼格不太够，这就需要你设置个人域名了。但是需要花钱。

注册一个阿里云账户,在[阿里云](https://wanwang.aliyun.com/?spm=5176.8142029.digitalization.2.e9396d3e46JCc5)上买一个域名，我买的是 `fangzh.top`，各个后缀的价格不太一样，比如最广泛的.com就比较贵，看个人喜好咯。

你需要先去进行实名认证,然后在域名控制台中，看到你购买的域名。

点**解析**进去，添加解析。

![image-20201019171348904](https://cdn.jsdelivr.net/gh/dywlkj/tuchuang/blog/imgimage-20201019171348904.png)

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstcu8xj20d607wdfw.jpg)

其中，192.30.252.153 和 192.30.252.154 是GitHub的服务器地址。

最新官方IP

```shell
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**注意，解析线路选择默认**，不要像我一样选境外。这个境外是后面来做国内外分流用的,在后面的博客中会讲到。记得现在选择**默认**！！

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstf8unj20ob05b0sq.jpg)

登录GitHub，进入之前创建的仓库，点击settings，设置Custom domain，输入你的域名`cxyo.cn`

![image-20201019171546833](https://i.loli.net/2020/10/19/mAMLf1JTusWBOPD.png)



然后在你的博客文件source中创建一个名为CNAME文件，不要后缀。写上你的域名。

![image-20201019171930584](https://i.loli.net/2020/10/19/dmir8TcbXSuBNFM.png)



最后，在gitbash中，输入

```
hexo clean
hexo g
hexo d
```

过不了多久，再打开你的浏览器，输入你自己的域名，就可以看到搭建的网站啦！

接下来你就可以正式开始写文章了。

```
hexo new newpapername
```

然后在source/_post中打开markdown文件，就可以开始编辑了。当你写完的时候，再

```
hexo clean
hexo g
hexo d
```

就可以看到更新了。







## Hexo简介

Hexo是一款基于Node.js的静态博客框架，依赖少易于安装使用，可以方便的生成静态网页托管在GitHub和Coding上，是搭建博客的首选框架。大家可以进入[hexo官网](https://hexo.io/zh-cn/)进行详细查看，因为Hexo的创建者是台湾人，对中文的支持很友好，可以选择中文进行查看。

教程分三个部分，

- 第一部分：hexo的初级搭建还有部署到github page上，以及个人域名的绑定。
- 第二部分：hexo的基本配置，更换主题，实现多终端工作，以及在coding page部署实现国内外分流
- 第三部分：hexo添加各种功能，包括搜索的SEO，阅读量统计，访问量统计和评论系统等。

------

# 第一部分

hexo的初级搭建还有部署到github page上，以及个人域名的绑定。

# Hexo简介

Hexo是一款基于Node.js的静态博客框架，依赖少易于安装使用，可以方便的生成静态网页托管在GitHub和Coding上，是搭建博客的首选框架。大家可以进入[hexo官网](https://hexo.io/zh-cn/)进行详细查看，因为Hexo的创建者是台湾人，对中文的支持很友好，可以选择中文进行查看。

# Hexo搭建步骤

1. 安装Git
2. 安装Node.js
3. 安装Hexo
4. GitHub创建个人仓库
5. 生成SSH添加到GitHub
6. 将hexo部署到GitHub
7. 设置个人域名
8. 发布文章

# 1. 安装Git

Git是目前世界上最先进的分布式版本控制系统，可以有效、高速的处理从很小到非常大的项目版本管理。也就是用来管理你的hexo博客文章，上传到GitHub的工具。Git非常强大，我觉得建议每个人都去了解一下。廖雪峰老师的Git教程写的非常好，大家可以了解一下。[Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

windows：到git官网上下载,[Download git](https://gitforwindows.org/),下载后会有一个Git Bash的命令行工具，以后就用这个工具来使用git。

linux：对linux来说实在是太简单了，因为最早的git就是在linux上编写的，只需要一行代码

```
sudo apt-get install git
1
```

安装好后，用`git --version` 来查看一下版本

# 2. 安装nodejs

Hexo是基于nodeJS编写的，所以需要安装一下nodeJs和里面的npm工具。

windows：[nodejs](https://nodejs.org/en/download/)选择LTS版本就行了。

linux：

```shell
sudo apt-get install nodejs
sudo apt-get install npm
12
```

安装完后，打开命令行

```
node -v
npm -v
12
```

检查一下有没有安装成功

顺便说一下，windows在git安装完后，就可以直接使用git bash来敲命令行了，不用自带的cmd，cmd有点难用。

# 3. 安装hexo

前面git和nodejs安装好后，就可以安装hexo了，你可以先创建一个文件夹blog，然后`cd`到这个文件夹下（或者在这个文件夹下直接右键git bash打开）。

输入命令

```
npm install -g hexo-cli
1
```

依旧用`hexo -v`查看一下版本

至此就全部安装完了。

接下来初始化一下hexo

```
hexo init myblog
1
```

这个myblog可以自己取什么名字都行，然后

```bash
cd myblog //进入这个myblog文件夹
npm install
12
```

新建完成后，指定文件夹目录下有：

- node_modules: 依赖包
- public：存放生成的页面
- scaffolds：生成文章的一些模板
- source：用来存放你的文章
- themes：主题
- ** _config.yml: 博客的配置文件**

```
hexo g
hexo server
12
```

打开hexo的服务，在浏览器输入localhost:4000就可以看到你生成的博客了。

大概长这样：
![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrksvj6e0j211c0f2n60.jpg)
使用ctrl+c可以把服务关掉。

# 4. GitHub创建个人仓库

首先，你先要有一个GitHub账户，去注册一个吧。

注册完登录后，在GitHub.com中看到一个New repository，新建仓库
![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstcm7ej20ei0c1aah.jpg)

创建一个和你用户名相同的仓库，[后面加.github.io](http://xn--yfr16an19l.github.io/)，只有这样，将来要部署到GitHub page的时候，才会被识别，[也就是xxxx.github.io](http://xn--xxxx-4m5f354ev5p.github.io/)，其中xxx就是你注册GitHub的用户名。我这里是已经建过了。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstusrdj20iw0o4myp.jpg)

点击create repository。

# 5. 生成SSH添加到GitHub

回到你的git bash中，

```
git config --global user.name "yourname"
git config --global user.email "youremail"
12
```

这里的yourname输入你的GitHub用户名，youremail输入你GitHub的邮箱。这样GitHub才能知道你是不是对应它的账户。

可以用以下两条，检查一下你有没有输对

```
git config user.name
git config user.email
12
```

然后创建SSH,一路回车

```
ssh-keygen -t rsa -C "youremail"
1
```

这个时候它会告诉你已经生成了.ssh的文件夹。在你的电脑中找到这个文件夹。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstd106j20kb073gll.jpg)

ssh，简单来讲，就是一个秘钥，其中，`id_rsa`是你这台电脑的私人秘钥，不能给别人看的，`id_rsa.pub`是公共秘钥，可以随便给别人看。把这个公钥放在GitHub上，这样当你链接GitHub自己的账户时，它就会根据公钥匹配你的私钥，当能够相互匹配时，才能够顺利的通过git上传你的文件到GitHub上。

而后在GitHub的setting中，找到SSH keys的设置选项，点击`New SSH key`
把你的`id_rsa.pub`里面的信息复制进去。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstdifaj210s0gfjrz.jpg)

在gitbash中，查看是否成功

```
ssh -T git@github.com
1
```

# 6. 将hexo部署到GitHub

这一步，我们就可以将hexo和GitHub关联起来，也就是将hexo生成的文章部署到GitHub上，打开站点配置文件 `_config.yml`，翻到最后，修改为
YourgithubName就是你的GitHub账户

```
deploy:
  type: git
  repo: https://github.com/YourgithubName/YourgithubName.github.io.git
  branch: master
1234
```

这个时候需要先安装deploy-git ，也就是部署的命令,这样你才能用命令部署到GitHub。

```
npm install hexo-deployer-git --save
1
```

然后

```
hexo clean
hexo generate
hexo deploy
123
```

其中 `hexo clean`清除了你之前生成的东西，也可以不加。
`hexo generate` 顾名思义，生成静态文章，可以用 `hexo g`缩写
`hexo deploy` 部署文章，可以用`hexo d`缩写

注意deploy时可能要你输入username和password。

得到下图就说明部署成功了，过一会儿就可以在`http://yourname.github.io` 这个网站看到你的博客了！！
![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstbtvfj20lq01u3yd.jpg)

# 7. 设置个人域名

现在你的个人网站的地址是 `yourname.github.io`，如果觉得这个网址逼格不太够，这就需要你设置个人域名了。但是需要花钱。

注册一个阿里云账户,在[阿里云](https://wanwang.aliyun.com/?spm=5176.8142029.digitalization.2.e9396d3e46JCc5)上买一个域名，我买的是 `fangzh.top`，各个后缀的价格不太一样，比如最广泛的.com就比较贵，看个人喜好咯。

你需要先去进行实名认证,然后在域名控制台中，看到你购买的域名。

点**解析**进去，添加解析。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstcu8xj20d607wdfw.jpg)

其中，192.30.252.153 和 192.30.252.154 是GitHub的服务器地址。

最新官方IP

```shell
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**注意，解析线路选择默认**，不要像我一样选境外。这个境外是后面来做国内外分流用的,在后面的博客中会讲到。记得现在选择**默认**！！

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstf8unj20ob05b0sq.jpg)

登录GitHub，进入之前创建的仓库，点击settings，设置Custom domain，输入你的域名`fangzh.top`

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstghklj20as04mt8n.jpg)

然后在你的博客文件source中创建一个名为CNAME文件，不要后缀。写上你的域名。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstgsyrj208806aq2z.jpg)

最后，在gitbash中，输入

```
hexo clean
hexo g
hexo d
123
```

过不了多久，再打开你的浏览器，输入你自己的域名，就可以看到搭建的网站啦！

接下来你就可以正式开始写文章了。

```
hexo new newpapername
1
```

然后在source/_post中打开markdown文件，就可以开始编辑了。当你写完的时候，再

```
hexo clean
hexo g
hexo d
123
```

就可以看到更新了。

# 第二部分

hexo的基本配置，更换主题，实现多终端工作，以及在coding page部署实现国内外分流。

# 1. hexo基本配置

在文件根目录下的`_config.yml`，就是整个hexo框架的配置文件了。可以在里面修改大部分的配置。详细可参考[官方的配置](https://hexo.io/zh-cn/docs/configuration)描述。

### 网站

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `title`       | 网站标题                                                     |
| `subtitle`    | 网站副标题                                                   |
| `description` | 网站描述                                                     |
| `author`      | 您的名字                                                     |
| `language`    | 网站使用的语言                                               |
| `timezone`    | 网站时区。Hexo 默认使用您电脑的时区。[时区列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)。比如说：`America/New_York`, `Japan`, 和 `UTC` 。 |

其中，`description`主要用于SEO，告诉搜索引擎一个关于您站点的简单描述，通常建议在其中包含您网站的关键词。`author`参数用于主题显示文章的作者。

### 网址

| 参数                 | 描述                                                         |
| -------------------- | ------------------------------------------------------------ |
| `url`                | 网址                                                         |
| `root`               | 网站根目录                                                   |
| `permalink`          | 文章的 [永久链接](https://hexo.io/zh-cn/docs/permalinks) 格式 |
| `permalink_defaults` | 永久链接中各部分的默认值                                     |

在这里，你需要把`url`改成你的网站域名。

permalink，也就是你生成某个文章时的那个链接格式。

比如我新建一个文章叫`temp.md`，那么这个时候他自动生成的地址就是`http://yoursite.com/2018/09/05/temp`。

以下是官方给出的示例，关于链接的变量还有很多，需要的可以去官网上查找 [永久链接](https://hexo.io/zh-cn/docs/permalinks) 。

| 参数                            | 结果                        |
| ------------------------------- | --------------------------- |
| `:year/:month/:day/:title/`     | 2013/07/14/hello-world      |
| `:year-:month-:day-:title.html` | 2013-07-14-hello-world.html |
| `:category/:title`              | foo/bar/hello-world         |

再往下翻，中间这些都默认就好了。

```
theme: landscape

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: <repository url>
  branch: [branch]

123456789
```

`theme`就是选择什么主题，也就是在`theme`这个文件夹下，在官网上有很多个主题，默认给你安装的是`lanscape`这个主题。当你需要更换主题时，在官网上下载，把主题的文件放在`theme`文件夹下，再修改这个参数就可以了。

接下来这个`deploy`就是网站的部署的，`repo`就是仓库(`Repository`)的简写。`branch`选择仓库的哪个分支。这个在之前进行github page部署的时候已经修改过了，不再赘述。而这个在后面进行双平台部署的时候会再次用到。

### Front-matter

Front-matter 是文件最上方以 `---` 分隔的区域，用于指定个别文件的变量，举例来说：

```
title: Hello World
date: 2013/7/13 20:46:25
---
123
```

下是预先定义的参数，您可在模板中使用这些参数值并加以利用。

| 参数         | 描述                 |
| ------------ | -------------------- |
| `layout`     | 布局                 |
| `title`      | 标题                 |
| `date`       | 建立日期             |
| `updated`    | 更新日期             |
| `comments`   | 开启文章的评论功能   |
| `tags`       | 标签（不适用于分页） |
| `categories` | 分类（不适用于分页） |
| `permalink`  | 覆盖文章网址         |

其中，分类和标签需要区别一下，分类具有顺序性和层次性，也就是说 `Foo, Bar` 不等于 `Bar, Foo`；而标签没有顺序和层次。

```
categories:
- Diary
tags:
- PS3
- Games
12345
```

### layout（布局）

当你每一次使用代码

```
hexo new paper
1
```

它其实默认使用的是`post`这个布局，也就是在`source`文件夹下的`_post`里面。

Hexo 有三种默认布局：`post`、`page` 和 `draft`，它们分别对应不同的路径，而您自定义的其他布局和 `post` 相同，都将储存到 `source/_posts` 文件夹。

| 布局    | 路径             |
| ------- | ---------------- |
| `post`  | `source/_posts`  |
| `page`  | `source`         |
| `draft` | `source/_drafts` |

而new这个命令其实是：

```
hexo new [layout] <title>
1
```

只不过这个layout默认是post罢了。

#### page

如果你想另起一页，那么可以使用

```
hexo new page board
1
```

系统会自动给你在source文件夹下创建一个board文件夹，[以及board文件夹中的index.md](http://xn--boardindex-zt2p02eqgs45dlht758bqmyd.md/)，这样你访问的board对应的链接就是`http://xxx.xxx/board`

#### draft

draft是草稿的意思，也就是你如果想写文章，又不希望被看到，那么可以

```
hexo new draft newpage
1
```

这样会在source/_draft中新建一个newpage.md文件，如果你的草稿文件写的过程中，想要预览一下，那么可以使用

```
hexo server --draft
1
```

在本地端口中开启服务预览。

如果你的草稿文件写完了，想要发表到post中，

```
hexo publish draft newpage
1
```

就会自动把newpage.md发送到post中。

------

# 2. 更换主题

到这一步，如果你觉得默认的`landscape`主题不好看，那么可以在官网的主题中，选择你喜欢的一个主题进行修改就可以啦。[点这里](https://hexo.io/themes/)

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkswpjhtj21fu0rhtp6.jpg)

这里有200多个主题可以选。不过最受欢迎的就是那么几个，比如[NexT主题](https://github.com/theme-next/hexo-theme-next)，非常的简洁好看，大多数人都选择这个，关于这个的教程也比较多。不过我选择的是[hueman](https://github.com/ppoffice/hexo-theme-hueman)这个主题，好像是从WordPress移植过来的，展示效果如下：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrksxvknrj21fc0q8tsl.jpg)

不管怎么样，至少是符合我个人的审美。

直接在github链接上下载下来，然后放到`theme`文件夹下就行了，然后再在刚才说的配置文件中把`theme`换成那个主题文件夹的名字，它就会自动在`theme`文件夹中搜索你配置的主题。

而后进入`hueman`这个文件夹，可以看到里面也有一个配置文件`_config.xml`，貌似它默认是`_config.xml.example`，把它复制一份，重命名为`_config.xml`就可以了。这个配置文件是修改你整个主题的配置文件。

### menu（菜单栏）

也就是上面菜单栏上的这些东西。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstfwjbj20jd0233ye.jpg)

其中，About这个你是找不到网页的，因为你的文章中没有about这个东西。如果你想要的话，可以执行命令

```
hexo new page about
1
```

它就会在根目录下`source`文件夹中新建了一个`about`文件夹，[以及index.md](http://xn--index-ok2hl60a.md/)，在index.md中写上你想要写的东西，就可以在网站上展示出来了。

如果你想要自己再自定义一个菜单栏的选项，那么就

```
hexo new page yourdiy
1
```

然后在主题配置文件的menu菜单栏添加一个 `Yourdiy : /yourdiy`，注意冒号后面要有空格，以及前面的空格要和menu中默认的保持整齐。然后在`languages`文件夹中，找到`zh-CN.yml`，在index中添加`yourdiy: '中文意思'`就可以显示中文了。

### customize(定制)

在这里可以修改你的个人logo，默认是那个hueman，在`source/css/images`文件夹中放入自己要的logo，再改一下`url`的链接名字就可以了。

`favicon`是网站中出现的那个小图标的icon，找一张你喜欢的logo，然后转换成ico格式，放在images文件夹下，配置一下路径就行。

`social_links` ，可以显示你的社交链接，而且是有logo的。

**tips:**

在这里可以添加一个rss功能，也就是那个符号像wifi一样的东西。

### 添加RSS

**1. 什么是RSS？**

RSS也就是订阅功能，你可以理解为类似与订阅公众号的功能，来订阅各种博客，杂志等等。

**2. 为什么要用RSS？**

就如同订阅公众号一样，你对某个公众号感兴趣，你总不可能一直时不时搜索这个公众号来看它的文章吧。博客也是一样，如果你喜欢某个博主，或者某个平台的内容，你可以通过RSS订阅它们，然后在RSS阅读器上可以实时推送这些消息。现在网上的垃圾消息太多了，如果你每一天都在看这些消息中度过，漫无目的的浏览，只会让你的时间一点一点的流逝，太不值得了。如果你关注的博主每次都发的消息都是精华，而且不是每一天十几条几十条的轰炸你，那么这个博主就值得你的关注，你就可以通过RSS订阅他。

在我的理解中，如果你不想每天都被那些没有质量的消息轰炸，只想安安静静的关注几个博主，每天看一些有质量的内容也不用太多，那么RSS订阅值得你的拥有。

**3. 添加RSS功能**

先安装RSS插件

```
npm i hexo-generator-feed
1
```

而后在你整个项目的`_config.yml`中找到Extensions，添加：

```
# Extensions
## Plugins: https://hexo.io/plugins/
#RSS订阅
plugin:
- hexo-generator-feed
#Feed Atom
feed:
  type: atom
  path: atom.xml
  limit: 20
12345678910
```

这个时候你的RSS链接就是 域名`/atom.xml`了。

所以，在主题配置文件中的这个`social links`，开启RSS的页面功能，这样你网站上就有那个像wifi一样符号的RSS logo了，注意空格。

```
rss: /atom.xml
1
```

**4. 如何关注RSS？**

首先，你需要一个RSS阅读器，在这里我推荐`inoreader`，宇宙第一RSS阅读器，而且中文支持的挺好。不过它没有PC端的程序，只有网页版，chrome上有插件。在官网上用google账号或者自己注册账号登录，就可以开始你的关注之旅了。

每次需要关注某个博主时，就点开他的RSS链接，把链接复制到`inoreader`上，就能关注了，当然，如果是比较大众化的很厉害的博主，你直接搜名字也可以的，比如每个人都非常佩服的阮一峰大师，直接在阅读器上搜索`阮一峰`，应该就能出来了。

我关注的比如，阮一峰的网络日志，月光博客，知乎精选等，都很不错。当然，还有我！！赶快关注我吧！你值得拥有：http://fangzh.top/atom.xml

在安卓端，inoreader也有下载，不过因为国内google是登录不了的，你需要在inoreader官网上把你的密码修改了，然后就可以用账户名和密码登录了。

在IOS端，没用过，好像是reader 3可以支持inoreader账户，还有个readon也不错，可以去试试。

### widgets(侧边栏)

侧边栏的小标签，如果你想自己增加一个，比如我增加了一个联系方式，那么我把`communication`写在上面，在`zh-CN.yml`中的`sidebar`，添加`communication: '中文'`。

然后在`hueman/layout/widget`中添加一个`communicaiton.ejs`，填入模板：

```js
<% if (site.posts.length) { %>
    <div class="widget-wrap widget-list">
        <h3 class="widget-title"><%= __('sidebar.communiation') %></h3>
        <div class="widget">
            <!--这里添加你要写的内容-->
        </div>
    </div>
<% } %>
12345678
```

### search(搜索框)

默认搜索框是不能够用的，

> you need to install `hexo-generator-json-content` before using Insight Search

它已经告诉你了，如果想要使用，就安装这个插件。

### comment(评论系统)

这里的多数都是国外的，基本用不了。这个`valine`好像不错，还能统计文章阅读量，可以自己试一试，[链接](https://valine.js.org/quickstart.html#npm)。

### miscellaneous(其他)

这里我就改了一个`links`，可以添加友链。注意空格要对！不然会报错！

### 总结：

整个主题看起来好像很复杂的样子，但是仔细捋一捋其实也比较流畅，

- languages: 顾名思义
- layout：布局文件，其实后期想要修改自定义网站上的东西，添加各种各样的信息，主要是在这里修改，其中`comment`是评论系统，`common`是常规的布局，最常修改的在这里面，比如修改页面`head`和`footer`的内容。
- scripts：js脚本，暂时没什么用
- source：里面放了一些css的样式，以及图片

------

# 3. git分支进行多终端工作

问题来了，如果你现在在自己的笔记本上写的博客，部署在了网站上，那么你在家里用台式机，或者实验室的台式机，发现你电脑里面没有博客的文件，或者要换电脑了，最后不知道怎么移动文件，怎么办？

在这里我们就可以利用git的分支系统进行多终端工作了，这样每次打开不一样的电脑，只需要进行简单的配置和在github上把文件同步下来，就可以无缝操作了。

### 机制

机制是这样的，由于`hexo d`上传部署到github的其实是hexo编译后的文件，是用来生成网页的，不包含源文件。

![可以看到，并没有source等源文件在内](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstj43xj20800d7glz.jpg)

也就是上传的是在本地目录里自动生成的`.deploy_git`里面。

其他文件 ，包括我们写在source 里面的，和配置文件，主题文件，都没有上传到github

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrksthbryj20eb07swej.jpg)

所以可以利用git的分支管理，将源文件上传到github的另一个分支即可。

### 上传分支

首先，先在github上新建一个hexo分支，如图：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstkyz7j20cp0bgdg5.jpg)

然后在这个仓库的settings中，选择默认分支为hexo分支（这样每次同步的时候就不用指定分支，比较方便）。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstl8uxj20ql0dsgmo.jpg)

然后在本地的任意目录下，打开git bash，

```shell
git clone git@github.com:ZJUFangzh/ZJUFangzh.github.io.git
1
```

将其克隆到本地，因为默认分支已经设成了hexo，所以clone时只clone了hexo。

接下来在克隆到本地的`ZJUFangzh.github.io`中，把除了.git 文件夹外的所有文件都删掉

把之前我们写的博客源文件全部复制过来，除了`.deploy_git`。这里应该说一句，复制过来的源文件应该有一个`.gitignore`，用来忽略一些不需要的文件，如果没有的话，自己新建一个，在里面写上如下，表示这些类型文件不需要git：

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
1234567
```

注意，如果你之前克隆过theme中的主题文件，那么应该把主题文件中的`.git`文件夹删掉，因为git不能嵌套上传，最好是显示隐藏文件，检查一下有没有，否则上传的时候会出错，导致你的主题文件无法上传，这样你的配置在别的电脑上就用不了了。

而后

```shell
git add .
git commit –m "add branch"
git push 
123
```

这样就上传完了，可以去你的github上看一看hexo分支有没有上传上去，其中`node_modules`、`public`、`db.json`已经被忽略掉了，没有关系，不需要上传的，因为在别的电脑上需要重新输入命令安装 。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstk4k1j20yq0h9gmr.jpg)

这样就上传完了。

### 更换电脑操作

一样的，跟之前的环境搭建一样，

- 安装git

```
sudo apt-get install git
1
```

- 设置git全局邮箱和用户名

```
git config --global user.name "yourgithubname"
git config --global user.email "yourgithubemail"
12
```

- 设置ssh key

```
ssh-keygen -t rsa -C "youremail"
#生成后填到github和coding上（有coding平台的话）
#验证是否成功
ssh -T git@github.com
ssh -T git@git.coding.net #(有coding平台的话)
12345
```

- 安装nodejs

```
sudo apt-get install nodejs
sudo apt-get install npm
12
```

- 安装hexo

```
sudo npm install hexo-cli -g
1
```

但是已经不需要初始化了，

直接在任意文件夹下，

```
git clone git@………………
1
```

然后进入克隆到的文件夹：

```
cd xxx.github.io
npm install
npm install hexo-deployer-git --save
123
```

生成，部署：

```
hexo g
hexo d
12
```

然后就可以开始写你的新博客了

```
hexo new newpage
1
```

**Tips:**

1. 不要忘了，每次写完最好都把源文件上传一下

```
git add .
git commit –m "xxxx"
git push 
123
```

1. 如果是在已经编辑过的电脑上，已经有clone文件夹了，那么，每次只要和远端同步一下就行了

```
git pull
1
```

------

# 4. coding page上部署实现国内外分流

之前我们已经把hexo托管在github了，但是github是国外的，而且百度的爬虫是不能够爬取github的，所以如果你希望你做的博客能够在百度引擎上被收录，而且想要更快的访问，那么可以在国内的coding page做一个托管，这样在国内访问就是coding page，国外就走github page。

**1. 申请coding账户，新建项目**

先申请一个账户，然后创建新的项目，这一步项目名称应该是随意的。

**2. 添加ssh key**

这一步跟github一样。

添加后，检查一下是不是添加成功

```
ssh -T git@git.coding.net
1
```

**3. 修改_config.yml**

hexo官方文档是这样的：

```
deploy:
  type: git
  message: [message]
  repo:
    github: <repository url>,[branch]
    coding: <repository url>,[branch] 
123456
```

那么，我们只需要：

```
deploy:
  type: git
  repo: 
    coding: git@git.coding.net:ZJUFangzh/ZJUFangzh.git,master
    github: git@github.com:ZJUFangzh/ZJUFangzh.github.io.git,master
12345
```

**4. 部署**

保存一下，直接

```
hexo g
hexo d
12
```

这样就可以在coding的项目上看到你部署的文件了。

**5. 开启coding pages服务，绑定域名**

如图：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstnswnj20xr0bugmj.jpg)

**6. 阿里云添加解析**

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstjxu6j20o709bdg1.jpg)

这个时候就可以把之前github的解析改成境外，把coding的解析设为默认了。

**7. 去除coding page的跳转广告**

coding page的一个比较恶心人的地方就是，你只是银牌会员的话，访问会先跳转到一个广告，再到你自己的域名。那么它也给出了消除的办法。右上角切换到coding的旧版界面，默认新版是不行的。然后再来到`pages服务`这里。

这里：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstmpshj20j80cbmxq.jpg)

只要你在页面上添加一行文字，写`Hosted by Coding Pages`，然后点下面的小勾勾，两个工作日内它就会审核通过了。

```
<p>Hosted by <a href="https://pages.coding.me" style="font-weight: bold">Coding Pages</a></p>
1
```

我的选择是把这一行代码放在主题文件夹`/layout/common/footer.ejs`里面，也就是本来在页面中看到的页脚部分。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstk1skj20lh0630su.jpg)

当然，为了统一，我又在后面加上了and **Github**哈哈，可以不加。

```
<p><span>Hosted by <a href="https://pages.coding.me" style="font-weight: bold">Coding Pages</a></span> and <span><a href="https://github.com" style="font-weight: bold">Github</a></span></p>
1
```

这是最终加上去的代码。

------

# 第三部分

hexo添加各种功能，包括搜索的SEO，阅读量统计，访问量统计和评论系统等。

本文参考了: [visugar.com](http://visugar.com/2017/08/01/20170801HexoPlugins/)这里面说的很详细了。

# 1. SEO优化

推广是很麻烦的事情，怎么样别人才能知道我们呢，首先需要让搜索引擎收录你的这个网站，别人才能搜索的到。那么这就需要SEO优化了。

> SEO是由英文Search Engine Optimization缩写而来， 中文意译为“搜索引擎优化”。SEO是指通过站内优化比如网站结构调整、网站内容建设、网站代码优化等以及站外优化。

### 百度seo

刚建站的时候是没有搜索引擎收录我们的网站的。可以在搜索引擎中输入`site:<域名>`

来查看一下。

**1. 登录百度站长平台添加网站**

登录[百度站长平台](https://ziyuan.baidu.com/linksubmit/index?)，在站点管理中添加你自己的网站。

验证网站有三种方式：文件验证、HTML标签验证、CNAME验证。

第三种方式最简单，只要将它提供给你的那个xxxxx使用CNAME解析到xxx.baidu.com就可以了。也就是登录你的阿里云，把这个解析填进去就OK了。

**2. 提交链接**

我们需要使用npm自动生成网站的sitemap，然后将生成的sitemap提交到百度和其他搜索引擎

```
npm install hexo-generator-sitemap --save     
npm install hexo-generator-baidu-sitemap --save
12
```

这时候你需要在你的根目录下`_config.xml`中看看url有没有改成你自己的：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstpzd9j20ar03b749.jpg)

重新部署后，就可以在public文件夹下看到生成的sitemap.xml和baidusitemap.xml了。

然后就可以向百度提交你的站点地图了。

这里建议使用自动提交。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstwp4pj20fc0kyq4n.jpg)

自动提交又分为三种：主动推送、自动推送、sitemap。

可以三个一起提交不要紧，我选择的是后两种。

- 自动推送：把百度生成的自动推送代码，放在主题文件`/layout/common/head.ejs`的适当位置，然后验证一下就可以了。
- sitemap：把两个sitemap地址，提交上去，看到状态正常就OK了。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrksu9fa6j20v60m4404.jpg)

**ps:** 百度收录比较慢，慢慢等个十天半个月再去`site:<域名>`看看有没有被收录。

### google的SEO

流程一样，google更简单，而且收录更快，进入[google站点地图](https://search.google.com/search-console/sitemaps?resource_id=http://fangzh.top/&hl=zh-CN)，提交网站和sitemap.xml，就可以了。

如果你这个域名在google这里出了问题，那你就提交 [yourname.github.io](http://yourname.github.io/)，这个链接，效果是一样的。

不出意外的话一天内google就能收录你的网站了。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkswrucmj20q30lkq72.jpg)

其他的搜索，如搜狗搜索，360搜索，流程是一样的，这里就不再赘述。

# 2. 评论系统

评论系统有很多，但是很多都是墙外的用不了，之前说过这个valine好像集成在hueman和next主题里面了，但是我还没有研究过，我看的是[visugar](http://visugar.com/2017/08/01/20170801HexoPlugins/)这个博主用的来比力评论系统，感觉也还不错。

[来比力官网](https://livere.com/)，注册好后，点击管理页面，在`代码管理`中找到安装代码：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrksu93vyj20tk0m440w.jpg)

获取安装代码后，在主题的comment下新建一个文件放入刚刚那段代码，再找到article文件，找到如下代码，若没有则直接在footer后面添加即可。livebe即为刚刚所创文件名称。

```
<%- partial('comment/livebe') %>
1
```

然后可以自己设置一些东西：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrksufavtj20v70o9mzw.jpg)

还可以设置评论提醒，这样别人评论你的时候就可以及时知道了。

# 3. 添加百度统计

百度统计可以在后台上看到你网站的访问数，浏览量，浏览链接分布等很重要的信息。所以添加百度统计能更有效的让你掌握你的网站情况。

[百度统计](https://tongji.baidu.com/)，注册一下，这里的账号好像和百度账号不是一起的。

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrksvbdmwj20lf0kx78n.jpg)

照样把代码复制到`head.ejs`文件中，然后再进行一下安装检查，半小时左右就可以在百度统计里面看到自己的网站信息了。

# 4. 文章阅读量统计leanCloud

[leanCloud](https://leancloud.cn/)，进去后注册一下，进入后创建一个应用：

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstp8rdj20h30cimxt.jpg)

在`存储`中创建Class，命名为Counter,

![img](http://ww1.sinaimg.cn/large/d40b6c29gy1fvrkstygbpj20gq0k0abm.jpg)

然后在设置页面看到你的`应用Key`，在主题的配置文件中：

```
leancloud_visitors:
  enable: true
  app_id: 你的id
  app_key: 你的key
1234
```

在`article.ejs`中适当的位置添加如下，这要看你让文章的阅读量统计显示在哪个地方了，

```
阅读数量:<span id="<%= url_for(post.path) %>" class="leancloud_visitors" data-flag-title="<%- post.title %>"></span>次
1
```

然后在`footer.ejs`的最后，添加：

```
<script src="//cdn1.lncld.net/static/js/2.5.0/av-min.js"></script>
<script>
    var APP_ID = '你的app id';
    var APP_KEY = '你的app key';
    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    // 显示次数
    function showTime(Counter) {
        var query = new AV.Query("Counter");
        if($(".leancloud_visitors").length > 0){
            var url = $(".leancloud_visitors").attr('id').trim();
            // where field
            query.equalTo("words", url);
            // count
            query.count().then(function (number) {
                // There are number instances of MyClass where words equals url.
                $(document.getElementById(url)).text(number?  number : '--');
            }, function (error) {
                // error is an instance of AVError.
            });
        }
    }
    // 追加pv
    function addCount(Counter) {
        var url = $(".leancloud_visitors").length > 0 ? $(".leancloud_visitors").attr('id').trim() : 'icafebolger.com';
        var Counter = AV.Object.extend("Counter");
        var query = new Counter;
        query.save({
            words: url
        }).then(function (object) {
        })
    }
    $(function () {
        var Counter = AV.Object.extend("Counter");
        addCount(Counter);
        showTime(Counter);
    });
</script>
12345678910111213141516171819202122232425262728293031323334353637383940
```

重新部署后就可以了。

# 5. 引入不蒜子访问量和访问人次统计

不蒜子的添加非常非常方便，[不蒜子](http://busuanzi.ibruce.info/)

在`footer.ejs`中的合适位置，看你要显示在哪个地方，添加：

```
<!--这一段是不蒜子的访问量统计代码-->
<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次 &nbsp;   </span>
<span id="busuanzi_container_site_uv">访客数<span id="busuanzi_value_site_uv"></span>人次</span>
1234
```

就可以了。

# 总结

到这里就基本做完了。其实都是参考别的博主的设置的，不一定仅限于hueman主题，其他主题的设置也是大体相同的，所以如果你希望设置别的主题，那么仔细看一下这个主题的代码结构，也能够把上边的功能添加进去。