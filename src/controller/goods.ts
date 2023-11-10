import type Koa from "koa";
import { goodsServers } from "../services/goods";
import { handlerError } from "../utils/error";

class GoodsController {
  async getUsers(ctx: Koa.Context) {
    const requestParams = ctx.query as any;
    try {
      const res = await goodsServers.getUsers(requestParams.userName);
      ctx.body = {
        code: 0,
        data: res,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      handlerError(ctx, error);
    }
  }
}

export const goodsController = new GoodsController();
