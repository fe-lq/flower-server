import type Koa from "koa";
import { HeadFieldConfig } from "../constants";
import { v1 as uuid } from "uuid";
import { logger } from "../logs";

export const httpLog = async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.request.header[HeadFieldConfig.REQUEST_ID] = uuid();
  if (ctx.request.method === "GET") {
    logger.info({ ...ctx.query, ...ctx.request.header });
  } else {
    logger.info({ ...ctx.request.body, ...ctx.request.header });
  }
  await next();
};
