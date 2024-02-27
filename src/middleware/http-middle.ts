import type Koa from "koa";
import { v1 as uuid } from "uuid";
import { logger } from "../logs";
import body from "koa-body";
import KoaJwt from "koa-jwt";
import JWT from "jsonwebtoken";
import {
  FORBIDDEN,
  JWT_SECRET_KEY,
  JWT_WHITE_LIST,
  TOKEN_EXPIRED_TIME,
  TOKEN_REFRESH_TIME,
  UNAUTHORIZED,
} from "../constants";
import { emitError } from "../utils/error";
import { redisClient } from "../redis";
import { userController } from "../controller/user";

/**
 * 请求日志
 * @param ctx
 * @param next
 */
export const httpLogMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.request.method === "GET") {
    logger.info({ ...ctx.query, ...ctx.request.header });
  } else {
    logger.info({ ...ctx.request.body, ...ctx.request.header });
  }
  await next();
};

/**
 * 配置公共的响应头解决跨域
 * @param ctx
 * @param next
 */
export const corsMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.set({
    "Access-Control-Allow-Origin": process.env.ALLOW_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
    "Access-Control-Max-Age": "3600", // 预检请求有效期1小时
    "X-Request-Id": uuid(),
  });
  try {
    await next();
  } catch (error) {
    // 没权限拦截
    ctx.status = error.status || 500;
    emitError(ctx, error, error.status);
  }
};

/**
 * 参数解析中间件
 */
export const parseBodyMiddle = body({
  onError: (err) => {
    // 处理错误
    logger.error(err.message + "参数解析错误");
  },
});

/**
 * 鉴权
 * @param ctx
 * @param next
 */
export const jwtAuthMiddle = KoaJwt({
  secret: JWT_SECRET_KEY,
}).unless({
  // jwt白名单
  path: JWT_WHITE_LIST,
  method: ["OPTIONS"],
});

export const validateTokenMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = ctx.header.authorization;
  if (
    JWT_WHITE_LIST.some((item) => item.test(ctx.url)) ||
    ctx.method === "OPTIONS"
  ) {
    await next();
  } else {
    try {
      if (token) {
        const errorToken = await redisClient.getValue(token);
        // 用已经退出的token请求就拦截
        if (errorToken) {
          emitError(ctx, undefined, UNAUTHORIZED);
        } else {
          // 查看用户还存不存在，防止用户被删除还能用旧token请求
          const { user, exp } = await userController.getUserByToken(token);

          if (user) {
            // 续签token
            const allowTime = parseInt(exp) - new Date().getTime() / 1000;
            if (allowTime < TOKEN_REFRESH_TIME) {
              const oldToken = await redisClient.getValue(user.phone);
              if (!oldToken) {
                const newToken = JWT.sign(
                  { phone: user.phone, password: user.password },
                  JWT_SECRET_KEY,
                  {
                    expiresIn: TOKEN_EXPIRED_TIME,
                  }
                );
                // 在请求头刷新token
                ctx.set({
                  "Refresh-Token": newToken,
                });
                await redisClient.setValue(
                  user.phone,
                  newToken,
                  TOKEN_REFRESH_TIME
                );
              }
            }
            await next();
          } else {
            emitError(ctx, { message: "当前用户不存在" }, FORBIDDEN);
          }
        }
      }
    } catch (error) {
      emitError(ctx, error);
    }
  }
};
