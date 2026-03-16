# Windows 10 Docker本地部署指南

本文档详细介绍如何在Windows 10操作系统上使用Docker容器部署基金温度表应用。

## 最新功能（2026-03-17最新更新）

- ✅ **GitHub Actions自动更新ETF数据** - 在A股交易时间内每15分钟自动更新ETF涨幅数据，无需手动操作
- ✅ **crawl_etf_github.py脚本** - GitHub Actions专用的ETF数据爬取脚本
- ✅ **requirements.txt文件** - Python依赖包列表
- ✅ ETF实时涨幅数据展示（从集思录爬取国内、欧美、亚洲、黄金ETF）
- ✅ 智能交易策略提示（买入/卖出/持有）
- ✅ 场外基金代码A/C类拆分显示
- ✅ Python定时爬虫自动更新数据
- ✅ fund-code.js统一数据源管理
- ✅ 代码可复用性优化（无硬编码指数代码）
- ✅ 项目代码精简（删除不需要的功能和文件）
- ✅ CSS代码清理（移除空规则集）
- ✅ 温度星级和股市晴雨表数据修复

## 目录
- [环境要求](#环境要求)
- [安装Docker Desktop](#安装docker-desktop)
- [准备项目文件](#准备项目文件)
- [方案一：使用Nginx容器部署](#方案一使用nginx容器部署)
- [方案二：使用Docker Compose部署](#方案二使用docker-compose部署)
- [部署ETF定时爬虫服务](#部署etf定时爬虫服务)
- [常见问题排查](#常见问题排查)

---

## 环境要求

### 硬件要求
- CPU：支持虚拟化的64位处理器
- 内存：至少8GB RAM（推荐16GB）
- 硬盘：至少20GB可用空间

### 软件要求
- 操作系统：Windows 10 64位（专业版、企业版或教育版，版本1903或更高）
- 启用Hyper-V和容器功能
- 启用BIOS虚拟化（Intel VT-x或AMD-V）

### 检查Windows版本
```powershell
# 在PowerShell中运行
winver
```
确保版本号不低于1903（内部版本18362）

---

## 安装Docker Desktop

### 步骤1：启用Hyper-V功能

1. 以管理员身份运行PowerShell
2. 执行以下命令启用Hyper-V：
```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```
3. 重启计算机

### 步骤2：下载Docker Desktop

1. 访问Docker官网：https://www.docker.com/products/docker-desktop
2. 点击"Download for Windows"下载安装程序
3. 或者直接访问：https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe

### 步骤3：安装Docker Desktop

1. 双击下载的`Docker Desktop Installer.exe`
2. 在安装向导中，确保勾选以下选项：
   - ✅ Use WSL 2 instead of Hyper-V（推荐，性能更好）
   - ✅ Add shortcut to desktop
3. 点击"Ok"开始安装
4. 安装完成后重启计算机

### 步骤4：配置Docker Desktop

1. 启动Docker Desktop
2. 首次启动需要接受服务协议
3. 等待Docker引擎启动完成（左下角显示"Engine running"）
4. 配置镜像加速（可选，提高下载速度）：
   - 点击右上角齿轮图标 → Settings → Docker Engine
   - 在JSON配置中添加国内镜像源：
```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
```
   - 点击"Apply & Restart"

### 步骤5：验证安装

打开PowerShell，执行以下命令：
```powershell
docker --version
docker run hello-world
```
如果显示Docker版本号和成功拉取hello-world镜像，说明安装成功。

---

## 准备项目文件

### 步骤1：创建项目目录

```powershell
# 创建项目目录
mkdir D:\docker\fund-temperature
cd D:\docker\fund-temperature
```

### 步骤2：复制项目文件

将fund-main文件夹中的所有文件复制到`D:\docker\fund-temperature`目录，包括：
```
fund-temperature/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── fund-code.js
├── images/
│   └── qrcode.png
├── crawl_jsl_etf.py
├── jsl.json
├── code.json
├── 2026-03-16.csv
├── 2026-03-13.csv
└── ...
```

---

## 方案一：使用Nginx容器部署

### 步骤1：创建Dockerfile

在项目目录`D:\docker\fund-temperature`下创建`Dockerfile`文件（无扩展名）：

```dockerfile
# 使用Nginx Alpine版本（体积小，性能好）
FROM nginx:alpine

# 设置维护者信息
LABEL maintainer="fund-temperature"

# 删除Nginx默认配置
RUN rm -rf /usr/share/nginx/html/*

# 复制项目文件到Nginx目录
COPY . /usr/share/nginx/html/

# 复制自定义Nginx配置（可选）
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露80端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 步骤2：构建Docker镜像

打开PowerShell，导航到项目目录：
```powershell
cd D:\docker\fund-temperature

# 构建镜像
docker build -t fund-temperature:latest .
```

构建过程输出示例：
```
[+] Building 15.2s (8/8) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load .dockerignore
 => [internal] load metadata for docker.io/library/nginx:alpine
 => [1/3] FROM docker.io/library/nginx:alpine
 => [internal] load build context
 => [2/3] COPY . /usr/share/nginx/html/
 => exporting to image
 => => writing image sha256:xxxxx
 => => naming to docker.io/library/fund-temperature:latest
```

### 步骤3：运行容器

```powershell
# 运行容器
docker run -d `
  --name fund-temperature `
  -p 80:80 `
  --restart unless-stopped `
  fund-temperature:latest
```

参数说明：
- `-d`：后台运行
- `--name fund-temperature`：容器名称
- `-p 80:80`：端口映射（主机端口:容器端口）
- `--restart unless-stopped`：除非手动停止，否则自动重启

### 步骤4：验证部署

1. 打开浏览器访问：http://localhost
2. 应该能看到基金温度表应用

### 步骤5：管理容器

```powershell
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 停止容器
docker stop fund-temperature

# 启动容器
docker start fund-temperature

# 重启容器
docker restart fund-temperature

# 删除容器
docker rm fund-temperature

# 查看容器日志
docker logs fund-temperature
```

---

## 方案二：使用Docker Compose部署

Docker Compose可以更方便地管理多个容器，推荐使用此方案。

### 步骤1：创建docker-compose.yml

在项目目录`D:\docker\fund-temperature`下创建`docker-compose.yml`文件：

```yaml
version: '3.8'

services:
  # Nginx Web服务
  web:
    image: nginx:alpine
    container_name: fund-temperature-web
    ports:
      - "80:80"
    volumes:
      # 挂载项目目录，实现热更新
      - ./:/usr/share/nginx/html
      # 自定义Nginx配置（可选）
      # - ./nginx.conf:/etc/nginx/conf.d/default.conf
    restart: unless-stopped
    networks:
      - fund-network

  # ETF数据爬虫服务
  crawler:
    image: python:3.9-alpine
    container_name: fund-temperature-crawler
    working_dir: /app
    volumes:
      # 挂载项目目录，爬虫生成的jsl.json会被Nginx服务访问
      - ./:/app
    command: sh -c "pip install schedule requests && python crawl_jsl_etf.py"
    restart: unless-stopped
    networks:
      - fund-network

networks:
  fund-network:
    driver: bridge
```

### 步骤2：启动服务

```powershell
cd D:\docker\fund-temperature

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 步骤3：管理服务

```powershell
# 停止所有服务
docker-compose down

# 重启所有服务
docker-compose restart

# 重启单个服务
docker-compose restart web
docker-compose restart crawler

# 查看web服务日志
docker-compose logs -f web

# 查看crawler服务日志
docker-compose logs -f crawler

# 更新服务（修改配置后）
docker-compose up -d --build
```

### 步骤4：数据热更新

由于使用了数据卷挂载，修改本地文件后无需重启容器：

1. 修改本地CSV文件或jsl.json文件
2. 刷新浏览器页面即可看到更新

---

## 部署ETF定时爬虫服务

### 方法1：在Docker容器中运行（推荐，已在docker-compose.yml中配置）

使用docker-compose.yml中的crawler服务即可，它会自动：
- 安装Python依赖
- 启动定时爬虫
- 在交易时间内每15分钟更新数据

### 方法2：在Windows本地运行

如果不想在容器中运行爬虫，可以在Windows本地运行：

```powershell
# 安装Python依赖
pip install schedule requests

# 进入项目目录
cd D:\docker\fund-temperature

# 运行爬虫
python crawl_jsl_etf.py
```

### 方法3：创建独立的爬虫容器

创建`Dockerfile.crawler`：

```dockerfile
FROM python:3.9-alpine

# 安装依赖
RUN pip install --no-cache-dir schedule requests

# 设置工作目录
WORKDIR /app

# 复制爬虫脚本
COPY crawl_jsl_etf.py /app/

# 运行爬虫
CMD ["python", "crawl_jsl_etf.py"]
```

构建和运行：

```powershell
# 构建爬虫镜像
docker build -f Dockerfile.crawler -t fund-crawler .

# 运行爬虫容器
docker run -d `
  --name fund-crawler `
  -v D:\docker\fund-temperature:/app `
  --restart unless-stopped `
  fund-crawler

# 查看日志
docker logs -f fund-crawler
```

---

## 常见问题排查

### 问题1：Docker Desktop无法启动

**解决方案：**
1. 检查BIOS虚拟化是否启用
2. 检查Windows功能是否启用：
   ```powershell
   # 启用WSL
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   
   # 启用虚拟机平台
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
3. 重启计算机后重试

### 问题2：端口80被占用

**错误信息：**
```
Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use
```

**解决方案：**
1. 查看占用80端口的进程：
   ```powershell
   netstat -ano | findstr :80
   ```
2. 停止占用端口的进程，或使用其他端口：
   ```powershell
   # 使用8080端口
   docker run -d --name fund-temperature -p 8080:80 fund-temperature:latest
   ```
3. 访问地址改为：http://localhost:8080

### 问题3：容器无法访问本地文件

**解决方案：**
1. 检查Docker Desktop的文件共享设置：
   - Settings → Resources → File Sharing
   - 添加项目目录`D:\docker`
2. 重启Docker Desktop

### 问题4：爬虫无法访问网络

**解决方案：**
1. 检查防火墙设置
2. 确保容器可以访问外网：
   ```powershell
   docker exec -it fund-temperature-crawler ping www.baidu.com
   ```
3. 如果使用代理，配置环境变量：
   ```yaml
   environment:
     - HTTP_PROXY=http://proxy-server:port
     - HTTPS_PROXY=http://proxy-server:port
   ```

### 问题5：数据不更新

**解决方案：**
1. 检查爬虫服务是否运行：
   ```powershell
   docker ps | findstr crawler
   docker logs fund-temperature-crawler
   ```
2. 检查jsl.json文件是否生成：
   ```powershell
   dir D:\docker\fund-temperature\jsl.json
   ```
3. 手动触发爬虫：
   ```powershell
   docker exec -it fund-temperature-crawler python crawl_jsl_etf.py
   ```

### 问题6：容器占用内存过高

**解决方案：**
1. 限制容器内存：
   ```powershell
   docker run -d --name fund-temperature -p 80:80 --memory="256m" fund-temperature:latest
   ```
2. 或在docker-compose.yml中配置：
   ```yaml
   services:
     web:
       deploy:
         resources:
           limits:
             memory: 256M
   ```

---

## 性能优化建议

### 1. 使用Alpine镜像
Alpine Linux镜像体积小（约5MB），启动快，占用资源少：
```dockerfile
FROM nginx:alpine
```

### 2. 启用Gzip压缩
创建`nginx.conf`：
```nginx
server {
    listen 80;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        
        # 启用Gzip压缩
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml;
        gzip_min_length 1000;
    }
}
```

### 3. 设置浏览器缓存
在`nginx.conf`中添加：
```nginx
location ~* \.(css|js|jpg|png|gif|ico|json)$ {
    expires 1d;
    add_header Cache-Control "public, immutable";
}
```

---

## 完整部署流程总结

### 快速部署（推荐）

```powershell
# 1. 进入项目目录
cd D:\docker\fund-temperature

# 2. 启动所有服务
docker-compose up -d

# 3. 查看服务状态
docker-compose ps

# 4. 访问应用
# 浏览器打开 http://localhost
```

### 服务管理

```powershell
# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看日志
docker-compose logs -f

# 更新服务
docker-compose up -d --build
```

---

## 附录：常用Docker命令速查

```powershell
# 镜像管理
docker images                    # 查看所有镜像
docker rmi <镜像名>              # 删除镜像
docker build -t <镜像名> .       # 构建镜像

# 容器管理
docker ps                        # 查看运行中的容器
docker ps -a                     # 查看所有容器
docker start <容器名>            # 启动容器
docker stop <容器名>             # 停止容器
docker restart <容器名>          # 重启容器
docker rm <容器名>               # 删除容器
docker logs <容器名>             # 查看日志
docker exec -it <容器名> sh      # 进入容器

# Docker Compose
docker-compose up -d             # 启动服务
docker-compose down              # 停止服务
docker-compose ps                # 查看服务状态
docker-compose logs -f           # 查看日志
docker-compose restart           # 重启服务

# 清理
docker system prune              # 清理未使用的资源
docker system prune -a           # 清理所有未使用的资源（包括镜像）
```

---

## 技术支持

如遇到其他问题，请参考：
- Docker官方文档：https://docs.docker.com/
- Nginx官方文档：https://nginx.org/en/docs/
- 项目GitHub仓库：（如有）

部署完成后，您就可以通过 http://localhost 访问基金温度表应用，并享受ETF实时涨幅数据和智能交易策略提示功能！
