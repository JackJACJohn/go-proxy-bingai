<div align="center">

![Go-Proxy-BingAI](./docs/img/header.png)

# Go-Proxy-BingAI

基于微软 New Bing 定制的微软 BingAI 演示站点

一致UI 体验, ChatGPT 提示词, 基本兼容 BingAI 所有功能, 一键登录, 支持 API 调用

一键部署, 国内可用, 无需登录即可畅聊

![Golang](https://img.shields.io/badge/Golang-1.22.1-blue?style=flat-square&logo=go) ![Vue3](https://img.shields.io/badge/Vue-3.3.2-green?style=flat-square&logo=vue.js)

![GitHub stars](https://img.shields.io/github/stars/Harry-zklcdc/go-proxy-bingai.svg?style=flat-square&label=Stars&logo=github) ![GitHub forks](https://img.shields.io/github/forks/Harry-zklcdc/go-proxy-bingai.svg?style=flat-square&label=Forks&logo=github) ![Release](https://img.shields.io/github/v/release/Harry-zklcdc/go-proxy-bingai.svg?style=flat-square&label=Release&logo=github&color=light-green)

</div>

## 📋 目录

- [Go-Proxy-BingAI](#Go-Proxy-BingAI)
  
  - [教程](#-教程十分重要)
  - [一键部署](#-一键部署)
  - [特色简介](#-特色简介)
  - [效果展示](#-效果展示)
  - [用户交流](#%EF%B8%8F-用户交流)
  - [免责声明](#%EF%B8%8F-免责声明)

## 📝 教程（十分重要）

> [!WARNING]
> 查看 [**>>>快速教程<<<**](https://github.com/Harry-zklcdc/go-proxy-bingai/wiki)

## 🚀 一键部署

> 📖 **[完整部署指南](./DEPLOY.md)** - 查看所有平台的详细部署教程

### BingAI + 人机验证服务器

> #### Docker 部署（推荐）
>
> [Docker 部署指南](./docker/README.md) | [中文指南](./docker/DOCKER_CN.md)
>
> ```bash
> cd docker && docker compose up -d
> ```

> #### CodeSandbox 部署
>
> [![Edit BingAI](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/github/Harry-zklcdc/go-proxy-bingai/tree/master?import=true)

### BingAI 本体

> #### Cloudflare Workers 部署（推荐）
>
> [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Harry-zklcdc/go-proxy-bingai)

> #### Cloudflare Pages 部署
>
> 从 [Cloudflare Dashboard](https://dash.cloudflare.com/) 连接 GitHub 仓库部署

> #### Vercel 部署
>
> [![Vercel 部署](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHarry-zklcdc%2Fgo-proxy-bingai&env=BYPASS_SERVER&project-name=go-proxy-bingai&repository-name=go-proxy-bingai)

> #### Zeabur 部署
>
> [![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/ZBA4SF)

> #### Deno Deploy 部署
>
> 从 [Deno Deploy](https://deno.com/deploy) 连接 GitHub 仓库，入口: `server.ts`

> #### Glitch 部署
>
> [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/Harry-zklcdc/go-proxy-bingai)

> #### Replit 部署
>
> [![Run on Repl.it](https://img.shields.io/badge/Run_on_Repl.it-grey?logo=replit&size=large)](https://repl.it/github/Harry-zklcdc/go-proxy-bingai)

> #### Render 部署
>
> 从 [Render Dashboard](https://dashboard.render.com/) 连接 GitHub 仓库部署

### 人机验证服务器

> #### CodeSandbox 部署
>
> [![Edit BingAI](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/github/Harry-zklcdc/go-bingai-pass/tree/main?import=true)

## 🚧 特色简介

✅ 提供免费云服务器一键部署

✅ 聊天服务器可在右上角 「设置 - 服务选择」 中切换

✅ 国内可用 （部署服务器需要直连 [Bing国际](https://www.bing.com) 不重定向 CN , 可配置 socks 连接）

✅ 支持现有开源 ChatGPT 提示词库

✅ 一键登录

✅ 登录账号支持画图

✅ 支持侧边栏聊天和撰写 - [Chrome插件](https://github.com/Harry-zklcdc/bingai-sidebar-chrome)

✅ 支持 OpenAI 格式 API 调用 - [📝 Wiki文档](https://github.com/Harry-zklcdc/go-proxy-bingai/wiki/BingAPI)

## 📌 效果展示

### 🖥️ 网页展示

<details><summary>点击展开网页效果</summary>

- 电脑端未登录状态

![电脑未登录](./docs/img/bing-nologin.png)

- 电脑端登录

![电脑端登录](./docs/img/bing-login-1.png)
![提示词1](./docs/img/bing-prompt-1.png)
![提示词2](./docs/img/bing-prompt-2.png)
![聊天服务器选择](./docs/img/bing-sydney-service-1.png)

- 电脑端画图

> ⭐ 需登录, 并选择**更有创造力**对话模式

![电脑端画图](./docs/img/bing-draw.png)

- 手机端未登录状态

![手机端未登录](./docs/img/bing-m-nologin.png)

</details>

### 👩🏻‍💻 侧边栏

<details><summary>点击展开侧边栏效果</summary>

- 在 Edge 浏览器可把聊天和撰写分别添加侧边栏

![添加侧边栏](./docs/img/sidebar-add.png)

![聊天](./docs/img/sidebar-chat.png)

![撰写](./docs/img/sidebar-compose.png)

</details>

## 🙋🏻‍♂️ 用户交流

[![加入 QQ 频道](https://img.shields.io/badge/加入_QQ_频道-ProxyBingAI🚀-blue?style=flat-square&logo=tencent-qq&color=red)](https://pd.qq.com/s/55utr9wd4)

[![Github Issus](https://img.shields.io/github/issues/Harry-zklcdc/go-proxy-bingai?style=flat-square&logo=github)](https://github.com/Harry-zklcdc/go-proxy-bingai/issues)

[![加入 Telegram 群组](https://img.shields.io/badge/加入_Telegram_群组-ProxyBingAI🚀-blue?style=flat-square&logo=telegram)](https://t.me/GoProxyBingAI)

[![加入 Discord 服务器](https://img.shields.io/badge/加入_Discord_服务器-ProxyBingAI🚀-slateblue?style=flat-square&logo=discord)](https://discord.gg/gHUhHqMp8s)


## ❗️ 免责声明

> [!NOTE]
> 本项目所有功能仅供学习和娱乐交流使用, 不代表微软的官方观点或立场。本项目不对任何由使用本项目产生的直接或间接损失负责, 包括但不限于数据丢失、系统损坏、法律风险等。本项目不保证本站点的功能完整性、稳定性、安全性和准确性, 也不保证本项目与微软 New Bing 的一致性。本项目不对本站点的内容进行审核或监督, 用户应自行承担使用本站点的风险和责任。本项目保留随时修改或终止本站点的权利, 恕不另行通知。
>
> 在中国大陆范围内使用请遵循[《生成式人工智能服务管理暂行办法》](http://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm)的要求, 请勿对中国地区公众提供一切未经备案的生成式人工智能服务。本项目开发者不对使用本项目产生的任何后果负责。

> [!NOTE]
> This project is a demonstration site based on Microsoft New Bing, All function just for learning and entertainment purposes only, and does not represent the official views or positions of Microsoft. This project is not responsible for any direct or indirect losses caused by using this site, including but not limited to data loss, system damage, legal risks, etc. This project does not guarantee the functionality, stability, security and accuracy of this site, nor does it guarantee the consistency of this site with Microsoft New Bing. This project does not review or supervise the content of this site, and users should bear the risks and responsibilities of using this site. This project reserves the right to modify or terminate this site at any time without prior notice.
>
> Please follow the requirements of the [《Interim Measures for the Management of Generative AI Services》](http://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm) when using it in Chinese Mainland, and do not provide any unregistered generative AI services to the public in China. The developer of this project is not responsible for any consequences arising from the use of this project.


## ⭐️ Star History

<div align="center">

<a href="https://star-history.com/#Harry-zklcdc/go-proxy-bingai&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Harry-zklcdc/go-proxy-bingai&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Harry-zklcdc/go-proxy-bingai&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Harry-zklcdc/go-proxy-bingai&type=Date" />
  </picture>
</a>

</div>