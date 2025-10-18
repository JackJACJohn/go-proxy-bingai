# Docker 部署指南

> 📖 **[中文版完整指南](./DOCKER_CN.md)** | English Version (This Document)

本目录包含了 Go Proxy BingAI 项目的 Docker 部署配置文件。

## 📁 文件说明

- `Dockerfile` - 基础生产环境镜像（仅 Go 后端，需提前构建前端）
- `Dockerfile.production` - 完整生产环境镜像（包含前端构建）
- `Dockerfile-with-pass` - 集成人机验证服务的镜像
- `docker-compose.yml` - 基础部署配置
- `docker-compose.dev.yml` - 开发环境配置
- `docker-compose-with-pass.yml` - 集成人机验证服务的部署配置
- `.env.example` - 环境变量配置示例

## 🚀 快速开始

### 方式一：使用预构建镜像（推荐）

使用官方预构建镜像，无需本地构建：

```bash
cd docker

# 复制环境变量配置文件
cp .env.example .env

# 编辑 .env 文件，根据需求修改配置
nano .env

# 启动服务（使用预构建镜像）
docker-compose up -d
```

如果你使用官方镜像，需要修改 `docker-compose.yml` 中的 image 配置：

```yaml
services:
  go-proxy-bingai:
    image: zklcdc/go-proxy-bingai:latest  # 使用官方镜像
    # 注释掉 build 部分
    # build:
    #   context: ..
    #   dockerfile: docker/Dockerfile
```

### 方式二：本地构建镜像

从源码构建镜像：

```bash
cd docker

# 构建并启动
docker-compose up -d --build

# 或者分步骤执行
docker-compose build
docker-compose up -d
```

### 方式三：使用人机验证服务

如果需要集成人机验证服务（需要 Cloudflare Zero Trust Token）：

```bash
cd docker

# 复制环境变量配置文件
cp .env.example .env

# 编辑 .env 文件，配置 CF_ZERO_TRUST_TOKEN 和 APIKEY
nano .env

# 启动服务
docker-compose -f docker-compose-with-pass.yml up -d
```

## 📋 环境变量说明

### 基础配置

| 变量名 | 说明 | 默认值 | 必填 |
|--------|------|--------|------|
| `PORT` | 服务监听端口 | `8080` | 否 |
| `LOG_LEVEL` | 日志级别 (DEBUG/INFO/WARN/ERROR) | `INFO` | 否 |
| `LOCAL_MODE` | 仅监听 127.0.0.1 | 未设置 | 否 |
| `Go_Proxy_BingAI_Debug` | 调试模式 | 未设置 | 否 |

### 服务地址配置

| 变量名 | 说明 | 默认值 | 必填 |
|--------|------|--------|------|
| `BYPASS_SERVER` | 人机验证服务器地址 | 无 | 否 |
| `BING_BASE_URL` | Bing 基础 URL | `https://www.bing.com` | 否 |
| `SYDNEY_BASE_URL` | Sydney API URL | `https://sydney.bing.com` | 否 |

### 代理配置

| 变量名 | 说明 | 默认值 | 必填 |
|--------|------|--------|------|
| `HTTP_PROXY` | HTTP 代理地址 | 无 | 否 |
| `HTTPS_PROXY` | HTTPS 代理地址 | 无 | 否 |

### 用户认证配置

| 变量名 | 说明 | 默认值 | 必填 |
|--------|------|--------|------|
| `Go_Proxy_BingAI_USER_TOKEN_*` | 用户令牌（支持多个） | 无 | 否 |
| `USER_KievRPSSecAuth` | Bing Cookie | 自动生成 | 否 |
| `USER_RwBf` | Bing Cookie | 无 | 否 |
| `USER_MUID` | Bing Cookie | 无 | 否 |
| `Go_Proxy_BingAI_AUTH_KEY` | API 访问密钥（逗号分隔） | 无 | 否 |

### With Pass 版本专用

| 变量名 | 说明 | 默认值 | 必填 |
|--------|------|--------|------|
| `CF_ZERO_TRUST_TOKEN` | Cloudflare Zero Trust Token | 无 | 是 |
| `APIKEY` | 内部 API 密钥 | 无 | 是 |

## 🛠️ 常用命令

### 查看日志

```bash
# 查看所有日志
docker-compose logs

# 查看实时日志
docker-compose logs -f

# 查看最近 100 行日志
docker-compose logs --tail=100
```

### 重启服务

```bash
# 重启服务
docker-compose restart

# 重新构建并重启
docker-compose up -d --build
```

### 停止服务

```bash
# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止并删除容器、网络、卷
docker-compose down -v
```

### 更新镜像

```bash
# 拉取最新镜像
docker-compose pull

# 重新启动
docker-compose up -d
```

## 🔧 开发环境

使用开发配置启动服务：

```bash
cd docker

# 启动开发环境
docker-compose -f docker-compose.dev.yml up -d

# 查看日志
docker-compose -f docker-compose.dev.yml logs -f
```

开发环境特点：
- 启用调试模式
- 日志级别为 DEBUG
- 可选的代码热重载（需取消注释 volumes 配置）

## 📊 健康检查

所有 Docker Compose 配置都包含健康检查功能，可以通过以下命令查看服务状态：

```bash
docker-compose ps
```

健康状态会显示为：
- `healthy` - 服务正常运行
- `unhealthy` - 服务异常
- `starting` - 服务启动中

## 🐛 故障排查

### 容器无法启动

1. 检查端口是否被占用：
```bash
# Linux/Mac
lsof -i :8080

# Windows
netstat -ano | findstr :8080
```

2. 查看容器日志：
```bash
docker-compose logs
```

### 服务返回错误

1. 检查环境变量配置是否正确
2. 查看容器日志获取详细错误信息
3. 确认网络连接正常，能访问 Bing 服务

### 人机验证服务异常

1. 确认 `CF_ZERO_TRUST_TOKEN` 配置正确
2. 检查 45678 端口是否正常监听
3. 确认 `BYPASS_SERVER` 设置为 `http://localhost:45678`

## 🔒 安全建议

1. **修改默认密钥**：务必修改 `.env` 中的 `APIKEY` 和 `Go_Proxy_BingAI_AUTH_KEY`
2. **使用 HTTPS**：生产环境建议使用反向代理（如 Nginx、Traefik）提供 HTTPS
3. **限制访问**：通过防火墙或反向代理限制访问来源
4. **定期更新**：定期拉取最新镜像更新服务

## 🌐 反向代理示例

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
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
    }
}
```

### Traefik 配置示例

```yaml
services:
  go-proxy-bingai:
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.bingai.rule=Host(`your-domain.com`)"
      - "traefik.http.services.bingai.loadbalancer.server.port=8080"
```

## 📝 多平台构建

构建支持多架构的镜像：

```bash
# 创建并使用 buildx builder
docker buildx create --use

# 构建多平台镜像
docker buildx build \
  --platform linux/amd64,linux/arm64,linux/arm/v7 \
  -t your-registry/go-proxy-bingai:latest \
  -f docker/Dockerfile \
  --push \
  ..
```

## 🤝 贡献

如果你发现 Docker 配置有任何问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 📄 许可证

本项目遵循主项目的许可证。
