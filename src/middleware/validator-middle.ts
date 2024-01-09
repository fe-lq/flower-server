import type Koa from "koa";
import type Joi from "joi";
import { emitError } from "../utils/error";
import { BAD_REQUEST } from "../constants";

/**
 * 生成公共的校验方法，校验请求参数
 * @returns verifyParams 中间件
 */
export const genVerifyParams = (schema: Joi.Schema) => {
  const verifyParams = async (ctx: Koa.Context, next: Koa.Next) => {
    let data: any;
    if (ctx.request.method === "GET") {
      data = ctx.request.query;
    } else {
      data = ctx.request.body;
    }
    const { error } = schema.validate(data, { allowUnknown: true });
    if (error) {
      emitError(ctx, error, BAD_REQUEST);
      return;
    }
    await next();
  };
  return verifyParams;
};
