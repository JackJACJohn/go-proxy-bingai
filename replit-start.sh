#!/bin/bash
set -euo pipefail

# Replit 启动脚本
echo "Installing dependencies..."
go mod download

echo "Building Go Proxy BingAI..."
go build -ldflags="-s -w" -tags netgo -trimpath -o go-proxy-bingai main.go

echo "Starting server on port ${PORT:-8080}"
exec ./go-proxy-bingai
