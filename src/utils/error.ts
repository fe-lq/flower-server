import type Koa from "koa";
import { logger } from "../logs";
import { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER_ERROR } from "../constants";

/**
 * 错误处理
 * @param ctx 请求上下文
 * @param code 状态码
 */
export const emitError = (
  ctx: Koa.Context,
  msg: any,
  stateCode = INTERNAL_SERVER_ERROR
) => {
  ctx.status = stateCode;
  switch (stateCode) {
    case BAD_REQUEST:
      ctx.body = {
        code: -1,
        message: msg?.message,
      };
      break;
    case FORBIDDEN:
      ctx.body = {
        code: -1,
        message: "无权限",
      };
      break;

    case INTERNAL_SERVER_ERROR:
      ctx.body = {
        code: -1,
        message: "system server error",
      };
      break;

    default:
      ctx.body = {
        code: -1,
        message: "bad request",
      };
  }

  // 打印日志
  logger.error(msg);
};
