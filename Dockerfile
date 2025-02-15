# 构建阶段
FROM node:18-alpine as builder

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制项目文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 部署阶段
FROM caddy:2-alpine

# 复制构建产物到Caddy服务目录
COPY --from=builder /app/dist /usr/share/caddy

# 复制Caddyfile配置
COPY Caddyfile /etc/caddy/Caddyfile

# 设置默认域名环境变量
ENV DOMAIN=localhost

# 暴露端口
EXPOSE 80
EXPOSE 443

# 启动Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]