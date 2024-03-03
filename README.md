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

## 项目结构

```sh
  .
  ├── public               # 静态资源
  ├── prisma               # 数据库配置文件
  ├── src                # 源码目录
  │   ├── app           # 项目框架启动
  │   ├── constants       # 配置常量
  │   ├── controller       # 控制器
  │   ├── db            # 数据库启动器
  │   ├── router           # 路由
  │   ├── logs           # 日志
  │   ├── services          # 服务
  │   ├── middleware      # 中间件
  │   ├── redis            # redis服务
  │   ├── utils            # 工具类
  │   ├── index.ts         # 入口文件
  │   └── type.ts          # 类型声明文件
  └── tsconfig.json      # typescript 配置文件
```

## 项目启动

```sh
  pnpm start
```

## 项目打包

```sh
  pnpm build
```

### 密钥生成方法

```sh
#生成私钥
openssl genrsa -out private_key.pem 1024
#生成私钥对应的共钥
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

## Prisma Node-ORM 教程

[Prisma 官网文档](https://www.prisma.io/docs/)

```shell
pnpm i prisma -D
pnpm i @prisma/client
```

prisma：是 cli 工具为了执行<code>npx prisma generate</code>命令用于自动生成数据库表的 model 类型，且连接数据库;

@prisma/client：用于查询、操作数据库；

在项目中执行如下步骤

```shell
## 自动生成.env 和.prisma配置文件
npx prisma init

## 拉取数据库表的类型，会自动写入在.prisma文件中
npx prisma db pull

## 根据.prisma文件的表类型生成对应的client可操作类型
npx prisma generate

```

.env 的配置文件以 mysql 为例

```typescript
/**
mysql: 数据库类型
root: 数据库账号
12345678: 数据库密码
my_db_admin: 数据库名称
localhost: 本地数据库启动的域名，线上的数据库域名可替换
3306: 端口
*/
DATABASE_URL = "mysql://root:12345678@localhost:3306/my_db_admin";
```

其他数据库类型的连接方式可参考 [这里](*https://pris.ly/d/connection-strings*)

## Prisma 使用方法

```typescript
// 在.prisma配置文件中配置
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql" // 数据库类型
  url      = env("DATABASE_URL")
}
```

### Prisma 基本语法

```typescript
import { PrismaClient, users } from "@prisma/client";
const prisma = new PrismaClient();
```

## 架构图

![](https://github.com/fe-lq/flower-server/blob/master/public/%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E5%9B%BE.png)
