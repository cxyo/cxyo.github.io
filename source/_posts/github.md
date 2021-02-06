---
title: GitHub免费搭建个人网站
date: 2021-01-31 00:48:12
tags:
- github
- 免费搭建网站
categories:
- github
- 免费搭建网站
---

最近在学习前端框架的过程中，一直想把自己学习中做的demo 发布到github 上去。但是在查看了很多相关资料也没能找到一个比较满意的结果。

无奈之下，只能尝试做用了一种自认为最low 的方式来达到部署个人demo 的目的。

  以下内容仅为抛砖引玉。如有理解不对的或者描述不准确的地方，请多见谅。当然也希望有对往github 部署个人项目了解的大神给指点个更好的方式。

  \1. 首先，我们在github上创建一个新的Repository “**test.github.io**”

![img](https://images2015.cnblogs.com/blog/1034113/201612/1034113-20161203031748756-713588169.png)

然后点击settings ，将其发布；如图记下github page 的链接。他将是发布后的站点的网址。

![img](https://images2015.cnblogs.com/blog/1034113/201612/1034113-20161203033349990-1057542525.png)

然后点击 continue to layout button, 然后点击Publish Page button，发布该页面。

然后我们就可以通过github page 链接进行访问我们刚发布的站点。 但是，这个并不是我们要发布的真正内容。

然后，我们需要将自己本地项目将其替换。已达到发布个人项目的目的。

接下来我们再次回到Repository “test.gihub.io” 然点击 “Code” 然后再点击 右边的 ”Clone or download “button

如图通过 Clone with HTTPS 的链接将该项目Clone 到本地，然后用我们本地的项目工程文件将其替换。

![img](https://images2015.cnblogs.com/blog/1034113/201612/1034113-20161203033237693-1527985797.png)

**但要注意的是，替换时，我们的主页对应原来项目的index.html**

**然后，我们再次访问该站点链接。会发现我们的项目已经部署到github上了**