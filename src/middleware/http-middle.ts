import type Koa from "koa";
import { v1 as uuid } from "uuid";
import { logger } from "../logs";

/**
 * 请求日志
 * @param ctx
 * @param next
 */
export const httpLog = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.request.method === "GET") {
    logger.info({ ...ctx.query, ...ctx.request.header });
  } else {
    logger.info({ ...ctx.request.body, ...ctx.request.header });
  }
  await next();
};

/**
 * 配置公共的响应头
 * @param ctx
 * @param next
 */
export const setHttpHeader = async (ctx: Koa.Context, next: Koa.Next) => {
  // ctx.verifyParams();
  ctx.set({
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Requested-With",
    "Access-Control-Allow-Credentials": "true", // 允许携带cookie
    "Access-Control-Max-Age": "3600", // 预检请求有效期1小时
    "X-Request-Id": uuid(),
  });
  // 当客户端存在预检请求时要设置如下配置
  if (ctx.request.method === "OPTIONS") {
    ctx.body = 200;
  }
  await next();
};
