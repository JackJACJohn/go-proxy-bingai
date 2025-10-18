# Docker 部署指南（中文版）

## 📋 概述

本项目提供了多种 Docker 部署方案，满足不同场景的需求：

| 文件 | 用途 | 特点 |
|------|------|------|
| `docker-compose.quickstart.yml` | 快速测试 | 使用预构建镜像，一键启动 |
| `docker-compose.yml` | 标准部署 | 支持本地构建或预构建镜像 |
| `docker-compose.dev.yml` | 开发调试 | 调试模式，详细日志输出 |
| `docker-compose-with-pass.yml` | 集成人机验证 | 包含本地人机验证服务 |

## 🚀 一分钟快速启动

### 使用预构建镜像（推荐新手）

```bash
# 1. 进入 docker 目录
cd docker

# 2. 快速启动（使用公共人机验证服务）
docker compose -f docker-compose.quickstart.yml up -d

# 3. 访问服务
# 打开浏览器访问 http://localhost:8080
```

### 从源码构建

```bash
# 1. 进入 docker 目录
cd docker

# 2. 启动服务（自动构建）
docker compose up -d

# 3. 查看日志
docker compose logs -f
```

## 📝 详细部署说明

### 方案一：标准部署（推荐）

```bash
cd docker

# 复制环境变量配置文件
cp .env.example .env

# 编辑配置（可选）
nano .env

# 启动服务
docker compose up -d

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f
```

### 方案二：开发环境

适合需要调试的场景：

```bash
cd docker

# 启动开发环境
docker compose -f docker-compose.dev.yml up -d

# 实时查看详细日志
docker compose -f docker-compose.dev.yml logs -f
```

开发环境特点：
- 自动启用调试模式
- 日志级别为 DEBUG
- 可以看到更详细的运行信息

### 方案三：集成人机验证服务

如果你有 Cloudflare Zero Trust Token，可以部署完整版（包含人机验证）：

```bash
cd docker

# 复制并编辑环境变量
cp .env.example .env
nano .env

# 在 .env 中配置以下必需参数：
# CF_ZERO_TRUST_TOKEN=your_cloudflare_token
# APIKEY=your_strong_password

# 启动完整服务
docker compose -f docker-compose-with-pass.yml up -d

# 查看服务状态（应该有两个端口：8080 和 45678）
docker compose -f docker-compose-with-pass.yml ps
```

## ⚙️ 环境变量配置

### 基础配置

在 `.env` 文件中配置以下变量：

```bash
# 服务端口（默认 8080）
PORT=8080

# 日志级别：DEBUG | INFO | WARN | ERROR
LOG_LEVEL=INFO

# 人机验证服务器（可选，使用公共服务）
BYPASS_SERVER=https://bypass.zklcdc.xyz

# 如果你有自己的代理服务器（可选）
# HTTP_PROXY=http://your-proxy:7890
# HTTPS_PROXY=http://your-proxy:7890
```

### 高级配置（可选）

```bash
# API 访问密钥（多个密钥用逗号分隔）
# Go_Proxy_BingAI_AUTH_KEY=sk-key1,sk-key2

# 自定义 Bing 服务地址（通常不需要修改）
# BING_BASE_URL=https://www.bing.com
# SYDNEY_BASE_URL=https://sydney.bing.com

# 用户 Cookie（保持登录状态）
# USER_KievRPSSecAuth=xxx
# USER_RwBf=xxx
# USER_MUID=xxx

# 本地模式（只监听 127.0.0.1）
# LOCAL_MODE=true
```

## 🛠️ 常用操作命令

### 查看日志

```bash
# 查看所有日志
docker compose logs

# 实时滚动查看日志
docker compose logs -f

# 查看最近 100 行日志
docker compose logs --tail=100

# 查看特定服务的日志
docker compose logs go-proxy-bingai
```

### 重启服务

```bash
# 重启服务
docker compose restart

# 停止服务
docker compose stop

# 启动服务
docker compose start

# 重新构建并启动
docker compose up -d --build
```

### 停止和清理

```bash
# 停止并删除容器
docker compose down

# 停止并删除容器、卷、网络
docker compose down -v

# 删除所有相关镜像
docker compose down --rmi all
```

### 更新服务

```bash
# 拉取最新镜像
docker compose pull

# 停止旧容器
docker compose down

# 启动新容器
docker compose up -d

# 清理旧镜像
docker image prune -f
```

## 🔍 故障排查

### 容器无法启动

**问题 1：端口被占用**

```bash
# 检查端口占用（Linux/Mac）
lsof -i :8080

# 或者修改 .env 文件中的 PORT 变量
PORT=8081
```

**问题 2：权限不足**

```bash
# 确保当前用户在 docker 组中
sudo usermod -aG docker $USER

# 重新登录或执行
newgrp docker
```

### 服务启动但无法访问

**检查服务状态：**

```bash
# 查看容器状态（应该是 healthy）
docker compose ps

# 查看容器日志
docker compose logs --tail=50
```

**测试服务：**

```bash
# 测试服务是否响应
curl http://localhost:8080/

# 或在浏览器中访问
# http://localhost:8080
```

### 健康检查失败

如果容器显示 unhealthy：

```bash
# 查看详细日志
docker compose logs -f

# 进入容器排查
docker compose exec go-proxy-bingai sh

# 在容器内测试
wget -q --spider http://localhost:8080/
```

## 🔒 安全建议

### 生产环境部署

1. **修改默认密钥**
   - 务必在 `.env` 中设置强密码
   - 特别是 `APIKEY` 和 `Go_Proxy_BingAI_AUTH_KEY`

2. **使用 HTTPS**
   - 建议使用 Nginx 或 Traefik 作为反向代理
   - 配置 SSL 证书

3. **限制访问来源**
   - 配置防火墙规则
   - 使用反向代理进行访问控制

### Nginx 反向代理配置示例

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

## 📊 资源监控

### 查看资源使用情况

```bash
# 查看所有容器的资源使用
docker stats

# 查看特定容器的资源使用
docker stats go-proxy-bingai
```

### 限制资源使用

在 `docker-compose.yml` 中取消注释以下配置：

```yaml
deploy:
  resources:
    limits:
      cpus: '1'        # 限制 CPU 使用
      memory: 512M     # 限制内存使用
    reservations:
      cpus: '0.5'      # 保留 CPU
      memory: 256M     # 保留内存
```

## 🎯 使用 Makefile（简化命令）

如果你觉得 docker compose 命令太长，可以使用 Makefile：

```bash
cd docker

# 查看所有可用命令
make help

# 构建并启动
make install

# 启动开发环境
make up-dev

# 查看日志
make logs

# 停止服务
make down

# 清理所有
make clean
```

## ❓ 常见问题

### Q1: 如何更改服务端口？

在 `.env` 文件中修改 `PORT` 变量，或直接修改 `docker-compose.yml` 中的端口映射：

```yaml
ports:
  - "8081:8080"  # 宿主机端口:容器端口
```

### Q2: 如何使用代理？

在 `.env` 文件中配置：

```bash
HTTP_PROXY=http://your-proxy:port
HTTPS_PROXY=http://your-proxy:port
```

### Q3: 如何持久化日志？

在 `docker-compose.yml` 中添加 volumes 配置：

```yaml
volumes:
  - ./logs:/var/log/app
```

### Q4: 如何使用自定义域名？

1. 配置反向代理（Nginx/Traefik）
2. 设置 DNS 解析
3. 配置 SSL 证书

### Q5: 容器时区不对怎么办？

已在 Dockerfile 中安装了 tzdata，如需修改时区，在 `docker-compose.yml` 中添加：

```yaml
environment:
  - TZ=Asia/Shanghai
```

## 📚 更多资源

- [主项目 README](../README.md)
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)

## 🤝 获取帮助

如果遇到问题：

1. 查看 [Issues](https://github.com/Harry-zklcdc/go-proxy-bingai/issues)
2. 加入 Telegram 群组讨论
3. 提交新的 Issue

## 📄 许可证

本项目遵循主项目的许可证。
