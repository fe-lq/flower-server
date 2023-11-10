import type Koa from "koa";
import { logger } from "../logs";

/**
 * 错误处理
 * @param ctx 请求上下文
 * @param code 状态码
 */
export const handlerError = (ctx: Koa.Context, msg: any, code = 500) => {
  ctx.status = code;
  switch (code) {
    case 400:
      ctx.body = {
        code: -1,
        message: msg?.message,
      };
      break;
    case 403:
      ctx.body = {
        code: -1,
        message: `无权限`,
      };
      break;

    default:
      ctx.body = {
        code: -1,
        message: `bad request`,
      };
  }

  // 打印日志
  logger.error(msg);
};
