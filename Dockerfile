# Stage 1 : Build
FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN pnpm install
RUN pnpm run build-demo

# Stage 2 : Run
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY resources/docker/config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist/demo /usr/share/nginx/html
