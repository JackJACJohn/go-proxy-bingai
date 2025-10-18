# Docker Build Makefile for Go Proxy BingAI

# 镜像名称和标签
IMAGE_NAME ?= go-proxy-bingai
IMAGE_TAG ?= latest
REGISTRY ?=

# 如果设置了 REGISTRY，添加前缀
ifdef REGISTRY
    FULL_IMAGE_NAME = $(REGISTRY)/$(IMAGE_NAME)
else
    FULL_IMAGE_NAME = $(IMAGE_NAME)
endif

# 检测 docker compose 命令 (v2 使用 "docker compose", v1 使用 "docker-compose")
DOCKER_COMPOSE := $(shell docker compose version > /dev/null 2>&1 && echo "docker compose" || echo "docker-compose")

.PHONY: help
help: ## 显示帮助信息
@echo "可用的 make 命令："
@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: ## 构建基础镜像（不包含前端）
@echo "构建基础镜像..."
docker build -f Dockerfile -t $(FULL_IMAGE_NAME):$(IMAGE_TAG) ..

.PHONY: build-production
build-production: ## 构建生产镜像（包含前端构建）
@echo "构建生产镜像（包含前端）..."
docker build -f Dockerfile.production -t $(FULL_IMAGE_NAME):$(IMAGE_TAG) ..

.PHONY: build-with-pass
build-with-pass: ## 构建集成人机验证的镜像
@echo "构建集成人机验证的镜像..."
docker build -f Dockerfile-with-pass -t $(FULL_IMAGE_NAME):with-pass ..

.PHONY: up
up: ## 启动服务
$(DOCKER_COMPOSE) up -d

.PHONY: up-dev
up-dev: ## 启动开发环境
$(DOCKER_COMPOSE) -f docker-compose.dev.yml up -d

.PHONY: up-with-pass
up-with-pass: ## 启动集成人机验证的服务
$(DOCKER_COMPOSE) -f docker-compose-with-pass.yml up -d

.PHONY: down
down: ## 停止并删除服务
$(DOCKER_COMPOSE) down

.PHONY: down-dev
down-dev: ## 停止开发环境
$(DOCKER_COMPOSE) -f docker-compose.dev.yml down

.PHONY: down-with-pass
down-with-pass: ## 停止集成人机验证的服务
$(DOCKER_COMPOSE) -f docker-compose-with-pass.yml down

.PHONY: logs
logs: ## 查看日志
$(DOCKER_COMPOSE) logs -f

.PHONY: logs-dev
logs-dev: ## 查看开发环境日志
$(DOCKER_COMPOSE) -f docker-compose.dev.yml logs -f

.PHONY: logs-with-pass
logs-with-pass: ## 查看集成人机验证服务的日志
$(DOCKER_COMPOSE) -f docker-compose-with-pass.yml logs -f

.PHONY: restart
restart: ## 重启服务
$(DOCKER_COMPOSE) restart

.PHONY: ps
ps: ## 查看服务状态
$(DOCKER_COMPOSE) ps

.PHONY: clean
clean: ## 清理所有容器和镜像
$(DOCKER_COMPOSE) down -v
docker rmi $(FULL_IMAGE_NAME):$(IMAGE_TAG) || true
docker rmi $(FULL_IMAGE_NAME):with-pass || true

.PHONY: push
push: ## 推送镜像到镜像仓库
@if [ -z "$(REGISTRY)" ]; then \
echo "错误: 请设置 REGISTRY 变量，例如: make push REGISTRY=your-registry.com"; \
exit 1; \
fi
docker push $(FULL_IMAGE_NAME):$(IMAGE_TAG)

.PHONY: pull
pull: ## 从镜像仓库拉取镜像
@if [ -z "$(REGISTRY)" ]; then \
echo "错误: 请设置 REGISTRY 变量，例如: make pull REGISTRY=your-registry.com"; \
exit 1; \
fi
docker pull $(FULL_IMAGE_NAME):$(IMAGE_TAG)

.PHONY: buildx-multiarch
buildx-multiarch: ## 构建多架构镜像
@echo "构建多架构镜像..."
docker buildx build \
--platform linux/amd64,linux/arm64,linux/arm/v7 \
-f Dockerfile \
-t $(FULL_IMAGE_NAME):$(IMAGE_TAG) \
--push \
..

.PHONY: install
install: build up ## 构建并启动服务

.PHONY: install-production
install-production: build-production up ## 构建生产镜像并启动

.PHONY: install-with-pass
install-with-pass: build-with-pass up-with-pass ## 构建并启动集成人机验证的服务
