# flower-admin 服务端

基于 Koa + Typescript + Mysql 创建

## 安装环境

首先要安装 node

```sh
  npm i -g pnpm
```

## 安装依赖

```sh
  pnpm i
```

## 启动项目

```sh
  pnpm start
```

### 密钥生成方法

```sh
#生成私钥
openssl genrsa -out private_key.pem 1024
#生成私钥对应的共钥
openssl rsa -in private_key.pem -pubout -out public_key.pem
```
