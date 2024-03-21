import type Koa from 'koa';
import { logger } from '../logs';
import { BAD_REQUEST, ERROR_CODE_MAP, INTERNAL_SERVER_ERROR } from '../constants';

/**
 * 错误处理
 * @param ctx 请求上下文
 * @param code 状态码
 */
export const emitError = (ctx: Koa.Context, msg: any, stateCode = INTERNAL_SERVER_ERROR) => {
  ctx.status = stateCode;
  switch (stateCode) {
    case BAD_REQUEST:
      ctx.body = {
        code: -1,
        message: msg?.message ?? ERROR_CODE_MAP[stateCode]
      };
      break;
    default:
      ctx.body = {
        code: -1,
        message: ERROR_CODE_MAP[stateCode] ?? 'bad request'
      };
      break;
  }
  // 打印日志
  if (msg) {
    logger.error(msg);
  }
};
