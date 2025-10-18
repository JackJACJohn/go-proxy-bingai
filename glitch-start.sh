#!/bin/bash
set -euo pipefail

# Glitch 启动脚本
echo "Starting Go Proxy BingAI on Glitch..."

# 设置环境变量
export PORT=${PORT:-8080}
export LOG_LEVEL=${LOG_LEVEL:-INFO}

# 构建应用
echo "Building application..."
go build -ldflags="-s -w" -tags netgo -trimpath -o go-proxy-bingai main.go

echo "Build successful! Starting server on port $PORT..."

# 启动应用
exec ./go-proxy-bingai
