import type Koa from 'koa';
import { v1 as uuid } from 'uuid';
import { logger } from '../logs';
import body from 'koa-body';
import KoaJwt from 'koa-jwt';
import JWT from 'jsonwebtoken';
import {
  FORBIDDEN,
  JWT_SECRET_KEY,
  JWT_WHITE_LIST,
  TOKEN_EXPIRED_TIME,
  TOKEN_REFRESH_TIME,
  UNAUTHORIZED
} from '../constants';
import { emitError } from '../utils/error';
import { redisClient } from '../redis';
import { userController } from '../controller/user';
import { ValidateError } from 'tsoa';

/**
 * 请求日志
 * @param ctx
 * @param next
 */
export const httpLogMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.request.method === 'GET') {
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
    'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*',
    'Access-Control-Max-Age': '3600', // 预检请求有效期1小时
    'X-Request-Id': uuid()
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
    logger.error(err.message + '参数解析错误');
  }
});

/**
 * 鉴权
 * @param ctx
 * @param next
 */
export const jwtAuthMiddle = KoaJwt({
  secret: JWT_SECRET_KEY
}).unless({
  // jwt白名单
  path: JWT_WHITE_LIST,
  method: ['OPTIONS']
});

/**
 * 验证token中间件
 * 主要功能：
 * 1. 白名单请求直接放行
 * 2. 检查token是否在黑名单中（已退出的token）
 * 3. 验证用户是否存在
 * 4. 处理token续签逻辑
 */
export const validateTokenMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = ctx.header.authorization;

  // 白名单和OPTIONS请求直接放行
  if (JWT_WHITE_LIST.some((item) => item.test(ctx.url)) || ctx.method === 'OPTIONS') {
    return await next();
  }

  try {
    if (!token) {
      return emitError(ctx, { message: '未提供认证令牌' }, UNAUTHORIZED);
    }

    // 检查token是否在黑名单中
    const errorToken = await redisClient.getValue(token);
    if (errorToken) {
      return emitError(ctx, { message: 'token已失效' }, UNAUTHORIZED);
    }

    // 验证用户信息
    const { user, exp } = await userController.getUserByToken(token);
    if (!user) {
      return emitError(ctx, { message: '当前用户不存在' }, FORBIDDEN);
    }

    // token续签逻辑
    const currentTime = new Date().getTime() / 1000;
    const remainingTime = exp - currentTime;

    if (remainingTime < TOKEN_REFRESH_TIME) {
      await handleTokenRefresh(ctx, user);
    }

    await next();
  } catch (error) {
    emitError(ctx, error);
  }
};

/**
 * 处理token续签逻辑
 * @param ctx Koa上下文
 * @param user 用户信息
 */
async function handleTokenRefresh(ctx: Koa.Context, user: any) {
  const oldToken = await redisClient.getValue(user.phone);
  if (!oldToken) {
    const newToken = JWT.sign({ phone: user.phone, password: user.password }, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRED_TIME
    });

    // 在响应头中设置新token
    ctx.set({
      'Refresh-Token': newToken
    });

    // 缓存新token
    await redisClient.setValue(user.phone, newToken, TOKEN_REFRESH_TIME);
  }
}

/**
 * 响应格式化中间件
 * @param ctx
 * @param next
 */
export const responseFormatter = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
    if (ctx.body && !ctx.response.headerSent) {
      ctx.body = {
        code: 200,
        message: 'ok',
        data: ctx.body
      };
    }
  } catch (error: any) {
    // 处理tsoa校验的参数
    if (error instanceof ValidateError) {
      const fields = Object.keys(error.fields).reduce<Record<string, string>>((acc, key) => {
        acc[key] = error.fields[key].message;
        return acc;
      }, {});
      ctx.body = {
        code: error.status,
        message: '参数错误',
        errors: fields
      };
    } else {
      ctx.body = {
        code: error.status || 500,
        message: error.message || 'Internal server error',
        errors: error.errors || []
      };
    }
  }
};
