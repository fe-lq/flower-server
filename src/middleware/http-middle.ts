import type Koa from 'koa';
import { v1 as uuid } from 'uuid';
import { logger } from '../logs';
import body from 'koa-body';
import JWT from 'jsonwebtoken';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  JWT_SECRET_KEY,
  JWT_WHITE_LIST,
  TOKEN_EXPIRED_TIME,
  TOKEN_REFRESH_TIME
} from '../constants';
import { redisClient } from '../redis';
import { userController } from '../controller/user';
import { ValidateError } from 'tsoa';
import KoaJwt from 'koa-jwt';
import { removeNullsDeep } from '../utils';
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
  await next();
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
 * JWT认证中间件
 */
export const jwtAuthMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  const authMiddleware = KoaJwt({
    secret: JWT_SECRET_KEY,
    isRevoked: async (ctx) => {
      const token = ctx.header.authorization;
      // 检查token是否在黑名单中
      const errorToken = await redisClient.getValue(token);
      if (errorToken) {
        ctx.state.jwtError = 'token已失效';
        return true;
      }

      try {
        const { user, exp } = await userController.getUserByToken(token);
        if (!user) {
          ctx.state.jwtError = '当前用户不存在';
          return true;
        }

        // token续签逻辑
        const currentTime = new Date().getTime() / 1000;
        const remainingTime = exp - currentTime;

        if (remainingTime < TOKEN_REFRESH_TIME) {
          await handleTokenRefresh(ctx, user);
        }

        return false;
      } catch (err) {
        ctx.state.jwtError = 'token无效';
        return true;
      }
    }
  }).unless({
    path: JWT_WHITE_LIST,
    method: ['OPTIONS']
  });

  try {
    await authMiddleware(ctx, async () => {
      await next();
    });
  } catch (err: any) {
    ctx.status = 401;
    ctx.body = {
      code: -1,
      message: ctx.state.jwtError || (err.message === 'jwt expired' ? 'token已失效' : 'token不存在')
    };
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
    // 直接处理 ctx.body
    if (!ctx.response.headerSent && ctx.body !== undefined) {
      const originalBody = ctx.body;
      ctx.body = {
        code: 0,
        message: 'success',
        data: originalBody
      };
    }
  } catch (error: any) {
    // 处理tsoa校验的参数
    if (error instanceof ValidateError) {
      const fields = Object.keys(error.fields).reduce<Record<string, string>>((acc, key) => {
        acc[key] = error.fields[key].message;
        return acc;
      }, {});
      ctx.status = BAD_REQUEST;
      ctx.body = {
        code: -1,
        message: '参数错误',
        errors: fields
      };
    } else {
      ctx.status = error.status || INTERNAL_SERVER_ERROR;
      ctx.body = {
        code: -1,
        message: error.message || 'Internal server error',
        errors: error.errors
      };
    }
  }
};

/**
 * 过滤返回数据null的key
 * @param ctx
 * @param next
 */
export const filterNullKey = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
    if (ctx.body) {
      ctx.body = removeNullsDeep(ctx.body);
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
