import type Koa from "koa";
import { logger } from "../logs";
import { HeadFieldConfig } from "../constants";
import { goodsServers } from "../services/goods";

class GoodsController {
  async getUsers(ctx: Koa.Context) {
    const requestParams = ctx.query as any;
    try {
      const res = await goodsServers.getUsers(requestParams.username);
      ctx.body = {
        code: 0,
        data: res,
        message: "查询成功",
      };
      ctx.response.status = 200;
    } catch (error) {
      ctx.body = {
        code: -1,
        message: `bad request`,
      };
      ctx.response.status = 404;
      logger.error(ctx.request.header[HeadFieldConfig.REQUEST_ID]);
    }
  }
}

export const goodsController = new GoodsController();
