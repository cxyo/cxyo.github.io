# 基金温度表网站部署教程

本教程将指导你如何使用Git和GitHub托管这个静态网站。

## 目录
- [准备工作](#准备工作)
- [安装Git](#安装git)
- [创建GitHub仓库](#创建github仓库)
- [部署代码](#部署代码)
- [使用GitHub Actions自动更新数据](#使用github-actions自动更新数据)
- [后续更新](#后续更新)
- [常见问题](#常见问题)
- [项目结构说明](#项目结构说明)

---

## 准备工作

### 1. 注册GitHub账号
- 访问 https://github.com 注册账号（如果已有账号可直接登录）

### 2. 准备文件
确保你有 `fund-main` 文件夹，包含以下内容：
```
fund-main/
├── index.html
├── css/style.css
├── js/app.js
├── images/qrcode.png
├── code.json
├── 2026-01-04.csv    # 历史数据文件示例
├── 2026-01-05.csv    # 历史数据文件示例
└── 2026-01-06.csv    # 最新数据文件示例
```

---

## 安装Git

### Windows安装步骤

1. **下载Git**
   - 访问：https://git-scm.com/download/win
   - 点击 **Download for Windows** 自动下载

2. **运行安装程序**
   - 双击下载的 `.exe` 文件
   - **重要：安装时勾选以下选项**：
     - ✅ "Git Bash Here" - 在右键菜单添加Git Bash
     - ✅ "Git GUI Here" - 在右键菜单添加Git GUI
     - ✅ "Use the OpenSSL library" - 使用OpenSSL
     - ✅ "Checkout Windows-style, commit Unix-style line endings" - 跨平台换行符
   - 点击 **Next** 直到 **Install**

3. **验证安装**
   - 打开新的终端（PowerShell或CMD）
   - 运行：`git --version`
   - 如果显示版本号（如 `git version 2.52.0`），表示安装成功

---

## 创建GitHub仓库

### 步骤1：创建Personal Access Token

GitHub需要token来验证身份，而不是直接用密码。

1. 打开 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 填写信息：
   - **Note**: `Git Push`（任意描述）
   - **Expiration**: 选择 `No expiration`（永不过期）
4. **勾选权限**：在 **repo** 区域，勾选全部选项
5. 点击页面底部的 **Generate token**
6. **立即复制并保存token**（形如：`ghp_xxxxxxxxxxxxxxxxxxxx`）
   - ⚠️ 关闭页面后无法再次查看！

### 步骤2：创建仓库

1. 登录GitHub后，点击右上角 **+** 号，选择 **New repository**
2. 填写仓库信息：
   - **Repository name**: `fund-main`
   - **Description**: 基金温度表查询网站
   - 选择 **Public**（公开仓库）
   - **不要**勾选 "Add a README file"
3. 点击 **Create repository**
4. 复制仓库地址（形如：`https://github.com/你的用户名/fund-main.git`）

---

## 部署代码

### 步骤1：初始化Git仓库

在本地打开终端（PowerShell或CMD），进入fund-main目录：

```bash
# 进入项目目录
cd D:\AI_CODE_project\DEMO\fund-main

# 初始化Git仓库
git init
```

### 步骤2：配置用户信息

```bash
# 设置用户名（替换为你的GitHub用户名）
git config --global user.name "你的GitHub用户名"

# 设置邮箱（替换为你的邮箱）
git config --global user.email "你的邮箱@example.com"
```

### 步骤3：添加并提交文件

```bash
# 添加所有文件到暂存区
git add .

# 提交代码
git commit -m "Initial commit: 基金温度表网站"
```

### 步骤4：关联远程仓库

```bash
# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/fund-main.git
```

### 步骤5：推送到GitHub

```bash
# 推送到GitHub
git push -u origin master
```

**首次推送需要验证**：
1. 输入用户名：你的GitHub用户名
2. 输入密码：粘贴你的 **Personal Access Token**（不是GitHub登录密码！）
3. 如果看到 `Branch 'master' set up to track remote branch`，表示成功！

---

## 后续更新

每次修改代码后，执行以下命令更新到GitHub：

```bash
# 进入项目目录
cd D:\AI_CODE_project\DEMO\fund-main

# 添加修改的文件
git add .

# 提交修改说明
git commit -m "描述你的修改内容"

# 推送到GitHub
git push
```

GitHub Pages会自动更新，通常 **1-2分钟后生效**。

---

## 启用GitHub Pages（让网站可访问）

1. 进入你的GitHub仓库页面
2. 点击顶部的 **Settings** 标签
3. 在左侧菜单中找到 **Pages** 选项
4. 在 **Build and deployment** 部分：
   - **Branch**: 选择 **master**（或main）
   - **Folder**: 选择 **/ (root)**
5. 点击 **Save**
6. **等待1-2分钟** 让GitHub部署完成

### 访问你的网站

部署完成后，访问地址为：
```
https://你的用户名.github.io/fund-main/
```

---

## 常见问题

### Q1: Git安装后命令不可用？

确保**重启终端**（关闭当前终端重新打开）后再运行git命令。

### Q2: 推送时提示输入密码？

GitHub已于2021年不再支持密码验证。需要使用 **Personal Access Token** 作为密码。

1. 打开 https://github.com/settings/tokens
2. 如果之前创建过token，直接使用
3. 如果没有，点击 **Generate new token** 创建
4. 在终端输入密码时，粘贴你的token

### Q3: 提示 "fatal: not a git repository"？

确保在正确的目录下执行命令：

```bash
cd D:\AI_CODE_project\DEMO\jjwd
git status
```

### Q4: 提示 "Everything up-to-date" 但文件没更新？

可能是没有add或commit：

```bash
git add .
git commit -m "更新说明"
git push
```

### Q5: CSV数据加载失败？
A: 确保所有日期命名的CSV文件（如2026-01-06.csv）位于仓库根目录，且文件名正确。系统会自动扫描本地目录下的所有CSV文件，按文件名日期降序排序，自动加载最新的两个文件。

**智能加载机制：**
- 完全基于本地CSV文件的实际名称，不依赖今天明天的日期
- 自动识别最新的两个CSV文件，无需手动指定日期
- 支持文件不连续的情况（如缺少1、2、3、4、10、11等日期）
- 每次增加或减少CSV文件，应用都会自动更新数据，无需修改任何代码
- 上一日涨跌使用最新CSV文件的涨跌幅
- 上两日涨跌使用次新CSV文件的涨跌幅

GitHub Pages对大小写敏感。系统会自动加载所有日期命名的CSV文件。

### Q6: 图片不显示？

检查 `images/qrcode.png` 路径是否正确。引用路径应使用相对路径，如 `images/qrcode.png`。

### Q7: 想更新网站内容？

每次修改后：

```bash
cd D:\AI_CODE_project\DEMO\fund-main
git add .
git commit -m "更新说明"
git push
```

GitHub Pages会自动更新，通常1-2分钟后生效。

### Q8: 推送失败，提示权限错误？

1. 检查用户名是否正确
2. 确认使用的是 **Personal Access Token** 而不是GitHub登录密码
3. 检查token是否有 **repo** 权限

### Q9: 如何查看提交历史？

```bash
# 查看提交历史
git log

# 简洁显示
git log --oneline
```

### Q10: 想撤销最近的提交？

```bash
# 撤销最近一次提交（保留文件修改）
git reset --soft HEAD~1

# 完全撤销（包括文件修改）
git reset --hard HEAD~1
```

---

## 自定义域名（可选）

如果你有自己的域名，可以：

1. 在 **Settings → Pages** 中找到 **Custom domain**
2. 输入你的域名
3. 在域名服务商处添加CNAME记录指向 `你的用户名.github.io`
4. 勾选 **Enforce HTTPS**

## 项目结构说明

```
fund-main/
├── index.html        # 主页面（包含HTML结构和表格）
├── DEPLOY_GUIDE.md   # 部署教程（本文档）
├── README.md         # 使用说明文档
├── css/
│   └── style.css     # 样式文件
├── js/
│   └── app.js        # 核心逻辑（数据加载、搜索、表格操作、图表绘制）
├── images/
│   └── qrcode.png    # 二维码图片
├── code.json         # 指数代码配置（自动读取显示）
├── 2026-01-04.csv    # 历史数据文件示例
├── 2026-01-05.csv    # 历史数据文件示例
└── 2026-01-06.csv    # 最新数据文件示例
```

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式设计，所有板块都添加了黑色边框，数据色块显示，温度、涨跌幅、关注度用浅色背景和加粗字体区分。类别底色区分，大盘、策略、主题、债券为浅灰色，小盘、行业、海外为浅蓝色。精选数据行用金色边框和浅蓝色底色标记。日期行用黑色线分成3份，显示数据日期、温度星级、版权信息。提示信息区域添加边框，包括点击提示、配置按钮、文件选择等。
- **JavaScript (ES6+)** - 交互逻辑
- **ECharts** - 数据可视化图表库（用于历史温度趋势图）
- **Papa Parse** - CSV解析库
- **Font Awesome** - 图标库

---

## 使用GitHub Actions自动更新数据

本项目包含一个GitHub Actions工作流，可以手动触发更新基金净值数据，避免频繁调用API导致被封号。

### 工作流功能

- 工作流名称：Update Fund Data
- 触发方式：手动触发
- 功能：爬取所有基金代码的180天历史净值数据
- 输出：生成 `data/fund-nav-data.json` 文件
- 好处：避免页面访问时频繁调用API，提高页面加载速度

### 手动触发工作流

1. 登录GitHub账号，进入仓库页面
2. 点击顶部导航栏的「Actions」选项卡
3. 在左侧找到「Update Fund Data」工作流
4. 点击「Run workflow」按钮
5. 在弹出的表单中，输入要获取的天数（默认180天）
6. 点击「Run workflow」按钮开始更新数据

### 处理403权限错误

如果您在运行工作流时遇到类似以下错误：
```
remote: Permission to username/repo.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/username/repo/': The requested URL returned error: 403
```

这是因为GitHub Actions机器人没有足够的权限推送更改到仓库。解决方法如下：

#### 方法1：修改仓库权限设置（推荐）

1. 进入仓库页面，点击「Settings」→「Actions」→「General」
2. 找到「Workflow permissions」部分
3. 选择「Read and write permissions」
4. 点击「Save」保存设置

#### 方法2：创建Personal Access Token (PAT)

1. 点击GitHub头像 →「Settings」→「Developer settings」→「Personal access tokens」→「Tokens (classic)」
2. 点击「Generate new token」→「Generate new token (classic)」
3. 在「Note」字段填写描述，例如「GitHub Actions Fund Data Update」
4. 在「Select scopes」部分，勾选「repo」权限组下的所有选项
5. 点击「Generate token」
6. 复制生成的Token，妥善保存（此Token只会显示一次）
7. 进入仓库页面，点击「Settings」→「Secrets and variables」→「Actions」
8. 点击「New repository secret」
9. 「Name」填写「GH_PAT」，「Secret」粘贴刚才复制的Token
10. 点击「Add secret」
11. 修改`.github/workflows/update-fund-data.yml`文件，将最后一步的git push命令改为使用Token：
    ```yaml
    git push https://${{ secrets.GH_PAT }}@github.com/${{ github.repository }}.git
    ```

**恭喜！你的基金温度表网站已经上线了！** 🎉

如有问题，请检查GitHub仓库的Actions标签页查看部署日志。

## 新增功能说明

### 基金温度历史图表

点击基金温度表中的任意指数行，即可显示该指数的基金温度历史记录折线图。

**功能特点：**
- 自动扫描文件夹内所有CSV文件
- 计算每个日期的温度值
- 支持选择时间范围（5天、10天、15天、20天）
- 显示最高和最低温度标记（最高温度红色，最低温度绿色）
- 平滑曲线和渐变填充效果
- 鼠标悬停显示详细信息

**温度计算规则：**
- 行业指数（E类）：温度 = PB分位点 × 100
- 其他指数：温度 = (PE分位点 + PB分位点) ÷ 2 × 100

**使用说明：**
- 点击时间范围按钮切换显示的天数
- 点击"关闭图表"按钮关闭图表
- 最高温度标记显示在红色点的上方
- 最低温度标记显示在绿色点的上方
