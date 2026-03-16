# 树莓派Docker部署指南

本文档详细介绍如何将基金温度表应用部署到树莓派的Docker容器中。

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

## 环境信息

- **服务器**：树莓派
- **用户名**：admin
- **目录**：/home/admin/funds
- **IP地址**：192.168.2.154

---

## 方案一：使用Nginx容器部署（推荐）

### 步骤1：准备树莓派环境

1. 确保树莓派已安装Docker
2. 检查Docker版本：
   ```bash
   docker --version
   ```

### 步骤2：准备项目文件

1. 在本地打包项目文件：
   ```bash
   cd d:\xiangmu\fund\fund-main
   # 压缩所有文件
   tar -czf fund-temperature.tar.gz *
   ```

2. 或者使用ZIP格式：
   ```bash
   # 在Windows上使用7-Zip或WinRAR压缩
   # 将fund-main文件夹压缩为fund-temperature.zip
   ```

### 步骤3：上传文件到树莓派

**方法1：使用SCP上传**
```bash
# 在本地Windows PowerShell或CMD中执行
scp fund-temperature.tar.gz admin@192.168.2.154:/home/admin/
```

**方法2：使用SFTP上传**
- 使用FileZilla、WinSCP等工具
- 连接信息：
  - 主机：192.168.2.154
  - 用户名：admin
  - 端口：22
  - 协议：SFTP
- 上传压缩文件到 /home/admin/

**方法3：使用Git上传**
```bash
# 在树莓派上执行
cd /home/admin
git clone https://github.com/你的用户名/fund-temperature.git
cd fund-temperature
```

### 步骤4：在树莓派上解压文件

```bash
# SSH登录到树莓派
ssh admin@192.168.2.154

# 进入目录
cd /home/admin

# 解压文件
tar -xzf fund-temperature.tar.gz

# 如果是ZIP文件
# unzip fund-temperature.zip

# 移动到目标目录
mv fund-main/* /home/admin/funds/
```

### 步骤5：创建Dockerfile

在 `/home/admin/funds/` 目录下创建 `Dockerfile`：

```dockerfile
FROM nginx:alpine

# 复制项目文件
COPY . /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 步骤6：构建和运行Docker容器

```bash
# 进入项目目录
cd /home/admin/funds

# 构建Docker镜像
docker build -t fund-temperature .

# 运行容器
docker run -d \
  --name fund-temperature \
  -p 80:80 \
  --restart unless-stopped \
  fund-temperature
```

### 步骤7：验证部署

1. 在浏览器中访问：
   ```
   http://192.168.2.154
   ```

2. 检查容器状态：
   ```bash
   docker ps
   ```

3. 查看容器日志：
   ```bash
   docker logs fund-temperature
   ```

---

## 方案二：使用Python HTTP服务器容器

### 步骤1：创建Dockerfile

在 `/home/admin/funds/` 目录下创建 `Dockerfile`：

```dockerfile
FROM python:3.9-alpine

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . /app

# 暴露8080端口
EXPOSE 8080

# 启动HTTP服务器
CMD ["python", "-m", "http.server", "8080"]
```

### 步骤2：构建和运行容器

```bash
# 进入项目目录
cd /home/admin/funds

# 构建Docker镜像
docker build -t fund-temperature .

# 运行容器
docker run -d \
  --name fund-temperature \
  -p 8080:8080 \
  --restart unless-stopped \
  fund-temperature
```

### 步骤3：验证部署

在浏览器中访问：
```
http://192.168.2.154:8080
```

---

## 方案三：使用Docker Compose（推荐）

### 步骤1：创建docker-compose.yml

在 `/home/admin/funds/` 目录下创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  fund-temperature:
    image: nginx:alpine
    container_name: fund-temperature
    ports:
      - "80:80"
    volumes:
      - ./:/usr/share/nginx/html
    restart: unless-stopped
```

### 步骤2：启动服务

```bash
# 进入目录
cd /home/admin/funds

# 启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps
```

### 步骤3：常用命令

```bash
# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 查看日志
docker-compose logs -f

# 更新服务（重新构建）
docker-compose up -d --build
```

---

## 常用Docker命令

```bash
# 查看所有容器
docker ps -a

# 查看容器日志
docker logs fund-temperature

# 进入容器
docker exec -it fund-temperature sh

# 停止容器
docker stop fund-temperature

# 启动容器
docker start fund-temperature

# 重启容器
docker restart fund-temperature

# 删除容器
docker rm fund-temperature

# 删除镜像
docker rmi fund-temperature
```

---

## 更新应用

当需要更新应用时：

```bash
# SSH登录到树莓派
ssh admin@192.168.2.154

# 进入项目目录
cd /home/admin/funds

# 拉取最新代码（如果使用Git）
git pull

# 或者重新上传文件

# 重启容器
docker restart fund-temperature

# 或者使用docker-compose
docker-compose restart
```

---

## 故障排查

### 容器无法启动

```bash
# 查看容器日志
docker logs fund-temperature

# 检查端口占用
netstat -tulnp | grep :80

# 检查Docker服务状态
sudo systemctl status docker
```

### 无法访问网页

```bash
# 检查防火墙
sudo ufw status

# 开放端口
sudo ufw allow 80
sudo ufw allow 8080

# 检查容器是否运行
docker ps
```

### 文件权限问题

```bash
# 修改文件权限
sudo chown -R admin:admin /home/admin/funds
sudo chmod -R 755 /home/admin/funds
```

### 容器资源不足

```bash
# 查看容器资源使用
docker stats fund-temperature

# 查看树莓派资源
free -h
df -h
```

---

## ETF数据定时爬取服务部署

如果需要显示ETF实时涨幅数据和智能交易策略，需要在树莓派上部署Python定时爬虫服务。

### 方法1：直接在宿主机运行（推荐）

```bash
# SSH登录到树莓派
ssh admin@192.168.2.154

# 进入项目目录
cd /home/admin/funds

# 安装Python依赖
pip3 install schedule requests

# 后台运行爬虫服务
nohup python3 crawl_jsl_etf.py > crawl.log 2>&1 &

# 查看运行状态
tail -f crawl.log
```

### 方法2：使用Docker运行

创建Dockerfile.crawler：

```dockerfile
FROM python:3.9-alpine

# 安装依赖
RUN pip install schedule requests

# 设置工作目录
WORKDIR /app

# 复制爬虫脚本
COPY crawl_jsl_etf.py /app/

# 运行爬虫
CMD ["python", "crawl_jsl_etf.py"]
```

构建和运行：

```bash
# 构建镜像
docker build -f Dockerfile.crawler -t fund-crawler .

# 运行容器
docker run -d \
  --name fund-crawler \
  -v /home/admin/funds:/app \
  --restart unless-stopped \
  fund-crawler
```

### 服务说明

- **爬取数据源**：集思录网站（国内ETF、欧美ETF、亚洲ETF、黄金ETF）
- **定时规则**：A股交易时间（9:30-11:30和13:00-15:00）内每15分钟自动执行
- **输出文件**：jsl.json（保存在项目根目录）
- **前端自动加载**：Nginx会自动提供jsl.json文件

---

## 推荐方案

**推荐使用方案三（Docker Compose + Nginx）**，因为：
- 配置简单，易于管理
- Nginx性能好，适合静态文件
- 支持一键启动、停止、重启
- 支持数据卷挂载，更新方便

**完整部署建议**：
1. 使用Docker Compose部署Nginx服务（方案三）
2. 在宿主机直接运行Python爬虫服务（方法1）
3. 爬虫生成的jsl.json会被Nginx自动提供

部署完成后，您就可以通过 `http://192.168.2.154` 访问基金温度表应用了！

---

## 注意事项

1. **端口冲突**：确保80端口或8080端口没有被其他服务占用
2. **防火墙设置**：确保防火墙允许访问对应端口
3. **文件权限**：确保Docker容器有权限访问项目文件
4. **资源限制**：树莓派资源有限，注意容器资源使用
5. **数据备份**：定期备份项目文件和数据
6. **安全性**：建议使用HTTPS，需要配置SSL证书

---

## 高级配置

### 配置HTTPS

如果需要使用HTTPS，需要修改Dockerfile和docker-compose.yml：

```dockerfile
FROM nginx:alpine

# 复制项目文件
COPY . /usr/share/nginx/html

# 复制SSL证书
COPY ssl-cert.pem /etc/nginx/ssl/
COPY ssl-key.pem /etc/nginx/ssl/

# 配置nginx
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露443端口
EXPOSE 443

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 配置自动更新

使用GitHub Webhook实现自动更新：

1. 在GitHub仓库中配置Webhook
2. 在树莓派上运行Webhook服务
3. 当有代码更新时，自动拉取并重启容器

### 配置日志管理

```bash
# 查看容器日志
docker logs -f fund-temperature > /var/log/fund-temperature.log

# 配置日志轮转
# 编辑docker-compose.yml添加日志配置
```

---

## 性能优化

### 使用缓存

```dockerfile
FROM nginx:alpine

# 配置nginx缓存
RUN echo 'proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m inactive=60m;' > /etc/nginx/conf.d/cache.conf
```

### 压缩静态文件

```dockerfile
# 启用gzip压缩
RUN echo 'gzip on; gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;' > /etc/nginx/conf.d/gzip.conf
```

---

## 监控和维护

### 健康检查

```bash
# 添加健康检查到docker-compose.yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### 定期备份

```bash
# 创建备份脚本
#!/bin/bash
BACKUP_DIR="/home/admin/backups"
DATE=$(date +%Y%m%d)
tar -czf $BACKUP_DIR/fund-temperature-$DATE.tar.gz /home/admin/funds

# 添加到crontab
0 2 * * * /home/admin/backup.sh
```

---

## 常见问题

### Q1: 容器启动失败？
A: 检查Dockerfile语法，查看容器日志，检查端口占用

### Q2: 无法访问网页？
A: 检查防火墙设置，检查容器是否运行，检查网络连接

### Q3: 如何更新应用？
A: 重新上传文件，然后重启容器或使用docker-compose restart

### Q4: 容器占用资源过多？
A: 使用docker stats查看资源使用，限制容器资源

### Q5: 如何查看日志？
A: 使用docker logs命令或docker-compose logs命令

---

## 技术支持

如遇到问题，请检查：
1. Docker日志：`docker logs fund-temperature`
2. Nginx日志：`docker exec fund-temperature cat /var/log/nginx/error.log`
3. 系统日志：`journalctl -u docker`

---

## 部署检查清单

- [ ] 树莓派已安装Docker
- [ ] Docker服务正常运行
- [ ] 项目文件已上传到 /home/admin/funds
- [ ] Dockerfile已创建
- [ ] docker-compose.yml已创建（如使用）
- [ ] 容器已成功构建
- [ ] 容器已成功运行
- [ ] 可以通过浏览器访问
- [ ] 防火墙已配置
- [ ] 端口已开放
- [ ] 日志正常输出
- [ ] 资源使用正常

---

## 快速部署命令

如果所有文件已准备好，可以使用以下命令快速部署：

```bash
# SSH登录到树莓派
ssh admin@192.168.2.154

# 进入目录
cd /home/admin/funds

# 使用docker-compose启动（推荐）
docker-compose up -d

# 或使用docker run启动
docker run -d --name fund-temperature -p 80:80 --restart unless-stopped fund-temperature
```

---

## 总结

本指南提供了三种部署方案，推荐使用Docker Compose方案，因为配置简单、易于管理、支持一键操作。部署完成后，您就可以在树莓派上运行基金温度表应用，并通过局域网IP地址访问。

祝您部署顺利！🎉
