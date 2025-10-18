# 多平台部署指南

本项目支持多种平台的一键部署，包括 Docker、Vercel、Cloudflare、Deno、Zeabur、Glitch 和 Replit。

> 📊 想快速比较各平台优劣？请查看 [部署平台对比表](./PLATFORM_COMPARISON.md)

## 📋 目录

- [Docker 部署](#docker-部署)
- [Vercel 部署](#vercel-部署)
- [Cloudflare 部署](#cloudflare-部署)
  - [Workers 部署](#workers-部署)
  - [Pages 部署](#pages-部署)
- [Deno Deploy 部署](#deno-deploy-部署)
- [Zeabur 部署](#zeabur-部署)
- [Glitch 部署](#glitch-部署)
- [Replit 部署](#replit-部署)
- [Render 部署](#render-部署)
- [环境变量配置](#环境变量配置)

---

## Docker 部署

Docker 是最推荐的部署方式，支持完整功能。

### 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/Harry-zklcdc/go-proxy-bingai.git
cd go-proxy-bingai/docker

# 2. 配置环境变量（可选）
cp .env.example .env
nano .env

# 3. 启动服务
docker compose up -d
```

📖 **详细文档**: [Docker 部署指南](./docker/README.md) | [中文指南](./docker/DOCKER_CN.md)

### 一键部署按钮

[![Deploy with Docker](https://img.shields.io/badge/Docker-Deploy-2496ED?style=for-the-badge&logo=docker&logoColor=white)](./docker/README.md)

---

## Vercel 部署

Vercel 支持无服务器函数部署，适合 API 接口使用。

### 特点

- ✅ 无服务器架构
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ⚠️ 不支持 WebSocket（Sydney API）
- ⚠️ 有请求时长限制（60秒）

### 部署步骤

1. **一键部署**

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHarry-zklcdc%2Fgo-proxy-bingai&env=BYPASS_SERVER&project-name=go-proxy-bingai&repository-name=go-proxy-bingai)

2. **配置环境变量**

   在 Vercel 项目设置中添加：
   - `BYPASS_SERVER`: 人机验证服务器地址
   - `APIKEY`: API 访问密钥（可选）
   - `USER_KievRPSSecAuth`: Bing Cookie（可选）

3. **部署完成**

   访问 `https://your-project.vercel.app`

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel login
vercel --prod
```

### 配置文件

项目根目录的 `vercel.json` 已包含必要配置：
- Go Runtime: `@vercel/go@3.0.5`
- Edge Functions for API routes
- 路由配置

---

## Cloudflare 部署

Cloudflare 提供两种部署方式：Workers 和 Pages。

### Workers 部署

#### 特点

- ✅ 全球边缘网络
- ✅ 极低延迟
- ✅ 免费额度充足
- ✅ 支持 WebSocket

#### 部署步骤

1. **一键部署**

   [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Harry-zklcdc/go-proxy-bingai)

2. **手动部署**

   ```bash
   # 安装 Wrangler CLI
   npm install -g wrangler
   
   # 登录
   wrangler login
   
   # 构建 Worker
   npm run build-worker
   
   # 部署
   wrangler deploy worker.js
   ```

3. **配置环境变量**

   在 Cloudflare Dashboard 设置环境变量：
   ```bash
   wrangler secret put BYPASS_SERVER
   wrangler secret put APIKEY
   ```

#### 配置文件

- `wrangler.toml`: Workers 配置
- `cloudflare/worker.js`: Worker 主文件
- `cloudflare/rollup.config.workers.mjs`: 构建配置

### Pages 部署

#### 特点

- ✅ 静态站点托管
- ✅ 支持 Functions（Edge）
- ✅ 自动构建和部署
- ✅ Git 集成

#### 部署步骤

1. **连接 GitHub 仓库**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 选择 Pages → Create a project
   - 连接 GitHub 仓库

2. **配置构建**
   ```
   构建命令: npm run build-page
   输出目录: cloudflare
   ```

3. **设置环境变量**
   - `BYPASS_SERVER`
   - `APIKEY`（可选）

4. **部署**
   - 每次推送到主分支自动部署

#### 配置文件

- `_headers`: HTTP 头配置
- `cloudflare/page.js`: Pages Functions
- `cloudflare/rollup.config.pages.mjs`: 构建配置

---

## Deno Deploy 部署

Deno Deploy 提供快速的边缘计算平台。

### 特点

- ✅ TypeScript 原生支持
- ✅ 零配置部署
- ✅ 全球边缘网络
- ⚠️ 不支持 Go 后端（仅 API 层）

### 部署步骤

1. **准备工作**
   - 注册 [Deno Deploy](https://deno.com/deploy) 账号
   - 安装 [Deno CLI](https://deno.land/#installation)

2. **一键部署**
   - 访问 [Deno Deploy Dashboard](https://dash.deno.com/projects)
   - 选择 "New Project"
   - 连接 GitHub 仓库
   - 入口文件: `server.ts`

3. **本地测试**
   ```bash
   deno task dev
   ```

4. **手动部署**
   ```bash
   # 使用 deployctl
   deployctl deploy --project=your-project server.ts
   ```

### 配置文件

- `deno.json`: Deno 配置和依赖
- `server.ts`: Deno 服务器入口（需要创建）

### 环境变量

在 Deno Deploy Dashboard 设置：
- `BYPASS_SERVER`
- `APIKEY`
- `PORT` (默认: 8080)

---

## Zeabur 部署

Zeabur 是现代化的应用部署平台。

### 特点

- ✅ 支持 Docker
- ✅ 自动构建
- ✅ 实时日志
- ✅ 一键部署

### 部署步骤

1. **一键部署**

   [![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/ZBA4SF)

2. **从仓库部署**
   - 登录 [Zeabur Dashboard](https://zeabur.com/dashboard)
   - 创建新项目
   - 从 GitHub 导入仓库
   - Zeabur 会自动检测 `Dockerfile`

3. **配置**
   - 端口: 8080
   - 环境变量: 在 Dashboard 中设置

### 配置文件

- `zeabur.json`: Zeabur 配置
- `docker/Dockerfile`: 构建配置

---

## Glitch 部署

Glitch 提供免费的应用托管和协作环境。

### 特点

- ✅ 免费托管
- ✅ 在线编辑器
- ✅ 实时预览
- ⚠️ 资源限制较多
- ⚠️ 不活跃时自动休眠

### 部署步骤

1. **一键部署**

   [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/Harry-zklcdc/go-proxy-bingai)

2. **从 GitHub 导入**
   - 访问 [Glitch](https://glitch.com/)
   - 点击 "New Project" → "Import from GitHub"
   - 输入仓库 URL

3. **配置环境变量**
   - 点击项目名称 → Tools → Secrets
   - 添加环境变量（`.env` 格式）

### 配置文件

- `watch.json`: Glitch 监控配置
- `glitch-start.sh`: 启动脚本
- `.glitch-assets`: Glitch 资源配置

### 环境变量

在 `.env` 文件中配置：
```bash
PORT=8080
LOG_LEVEL=INFO
BYPASS_SERVER=https://bypass.zklcdc.xyz
```

---

## Replit 部署

Replit 提供在线 IDE 和托管服务。

### 特点

- ✅ 免费托管
- ✅ 在线 IDE
- ✅ 协作编程
- ✅ 自动构建
- ⚠️ 免费版有资源限制

### 部署步骤

1. **一键部署**

   [![Run on Repl.it](https://img.shields.io/badge/Run_on-Repl.it-grey?logo=replit&style=for-the-badge)](https://repl.it/github/Harry-zklcdc/go-proxy-bingai)

2. **从 GitHub 导入**
   - 访问 [Replit](https://replit.com/)
   - 点击 "Create" → "Import from GitHub"
   - 输入仓库 URL

3. **配置**
   - Replit 会自动检测 `.replit` 配置文件
   - 环境变量在 Secrets 标签中设置

4. **运行**
   - 点击顶部的 "Run" 按钮
   - 服务将在 `https://your-repl.repl.co` 运行

### 配置文件

- `.replit`: Replit 配置
- `replit-start.sh`: 启动脚本

### 环境变量

在 Replit Secrets 中设置：
- `PORT`: 8080
- `LOG_LEVEL`: INFO
- `BYPASS_SERVER`: https://bypass.zklcdc.xyz

---

## Render 部署

Render 提供简单的应用部署服务。

### 特点

- ✅ 免费层级
- ✅ 自动 HTTPS
- ✅ 持续部署
- ⚠️ 免费版会在不活跃时休眠

### 部署步骤

1. **从 Blueprint 部署**
   - 访问 [Render Dashboard](https://dashboard.render.com/)
   - 点击 "New" → "Blueprint"
   - 连接 GitHub 仓库

2. **手动配置**
   - Service Type: Web Service
   - Build Command: `go build -ldflags="-s -w" -tags netgo -trimpath -o go-proxy-bingai main.go`
   - Start Command: `./go-proxy-bingai`

3. **设置环境变量**
   - 在 Environment 标签中添加变量

### 配置文件

- `render.yaml`: Render Blueprint 配置

---

## 环境变量配置

所有平台都支持以下环境变量：

### 必需变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `PORT` | 服务端口 | `8080` |

### 可选变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `LOG_LEVEL` | 日志级别 | `INFO` |
| `BYPASS_SERVER` | 人机验证服务器 | `https://bypass.zklcdc.xyz` |
| `BING_BASE_URL` | Bing 基础地址 | `https://www.bing.com` |
| `SYDNEY_BASE_URL` | Sydney API 地址 | `https://sydney.bing.com` |
| `HTTP_PROXY` | HTTP 代理 | `http://proxy:port` |
| `HTTPS_PROXY` | HTTPS 代理 | `http://proxy:port` |
| `Go_Proxy_BingAI_USER_TOKEN_*` | 用户令牌 | `token1,token2` |
| `USER_KievRPSSecAuth` | Bing Cookie | - |
| `USER_RwBf` | Bing Cookie | - |
| `USER_MUID` | Bing Cookie | - |
| `Go_Proxy_BingAI_AUTH_KEY` | API 密钥 | `sk-xxx,sk-yyy` |
| `APIKEY` | 内部 API 密钥 | `sk-xxx` |
| `LOCAL_MODE` | 本地模式 | `true` |
| `Go_Proxy_BingAI_Debug` | 调试模式 | `true` |

---

## 平台对比

| 平台 | 免费额度 | WebSocket | 全功能 | 难度 | 推荐度 |
|------|----------|-----------|--------|------|--------|
| Docker | - | ✅ | ✅ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Vercel | 100GB/月 | ❌ | ⚠️ | ⭐ | ⭐⭐⭐⭐ |
| Cloudflare Workers | 100k请求/天 | ✅ | ✅ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| Cloudflare Pages | 无限 | ✅ | ✅ | ⭐ | ⭐⭐⭐⭐⭐ |
| Deno Deploy | 100k请求/天 | ✅ | ⚠️ | ⭐⭐ | ⭐⭐⭐ |
| Zeabur | 有限 | ✅ | ✅ | ⭐ | ⭐⭐⭐⭐ |
| Glitch | 有限 | ✅ | ✅ | ⭐ | ⭐⭐⭐ |
| Replit | 有限 | ✅ | ✅ | ⭐ | ⭐⭐⭐ |
| Render | 750小时/月 | ✅ | ✅ | ⭐ | ⭐⭐⭐⭐ |

### 选择建议

- **生产环境**: Docker、Cloudflare Workers/Pages
- **个人使用**: Vercel、Zeabur、Render
- **快速测试**: Glitch、Replit
- **学习开发**: Deno Deploy

---

## 故障排查

### 常见问题

1. **构建失败**
   - 检查 Go 版本（需要 1.21+）
   - 确认依赖已正确安装
   - 查看构建日志

2. **运行错误**
   - 验证环境变量配置
   - 检查端口是否被占用
   - 查看应用日志

3. **API 不可用**
   - 确认 BYPASS_SERVER 可访问
   - 检查网络连接
   - 验证 Cookie 配置

4. **WebSocket 连接失败**
   - 某些平台不支持 WebSocket
   - 尝试使用 Cloudflare Workers

### 获取帮助

- [GitHub Issues](https://github.com/Harry-zklcdc/go-proxy-bingai/issues)
- [Telegram 群组](https://t.me/GoProxyBingAI)
- [Discord 服务器](https://discord.gg/gHUhHqMp8s)

---

## 许可证

本项目遵循 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。
