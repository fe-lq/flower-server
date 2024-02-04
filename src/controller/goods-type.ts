import type Koa from "koa";
import { goodsTypeServers } from "../services/goods-type";
import { emitError } from "../utils/error";

class GoodsTypeController {
  async getTypeList(ctx: Koa.Context) {
    const requestParams = (ctx.request.body as any) ?? {};
    try {
      const res = await goodsTypeServers.getTypes(requestParams);
      ctx.body = {
        code: 0,
        data: res,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  async addType(ctx: Koa.Context) {
    const requestParams = ctx.request.body as any;
    try {
      const res = await goodsTypeServers.addType(requestParams);
      ctx.body = {
        code: 0,
        data: res,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
  async updateType(ctx: Koa.Context) {
    const requestParams = ctx.request.body as any;
    try {
      const res = await goodsTypeServers.updateType(requestParams);
      ctx.body = {
        code: 0,
        data: res,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  async deleteType(ctx: Koa.Context) {
    const { id } = ctx.query as any;
    try {
      const res = await goodsTypeServers.deleteType(Number(id));
      ctx.body = {
        code: 0,
        data: res,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
}

export const goodsTypeController = new GoodsTypeController();
