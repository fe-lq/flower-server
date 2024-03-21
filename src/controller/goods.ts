import type Koa from 'koa';
import { goodsServers } from '../services/goods';
import { emitError } from '../utils/error';
import fs from 'fs';

class GoodsController {
  async getGoods(ctx: Koa.Context) {
    const requestParams = (ctx.request.body as any) ?? {};
    try {
      const res = await goodsServers.getGoods(requestParams);
      ctx.body = {
        code: 0,
        data: res.map((item) => ({
          ...item,
          goodsImgs: item.goodsImgs.split(',')
        })),
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  async createGoods(ctx: Koa.Context) {
    const requestParams = ctx.request.body as any;
    try {
      const goodsImages = requestParams.goodsImgs.join(',');
      await goodsServers.addGoods({ ...requestParams, goodsImgs: goodsImages });
      ctx.body = {
        code: 0,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
  async updateGoods(ctx: Koa.Context) {
    const requestParams = ctx.request.body as any;
    try {
      const goodsImages = requestParams.goodsImgs.join(',');
      await goodsServers.updateGoods({
        ...requestParams,
        goodsImgs: goodsImages
      });
      ctx.body = {
        code: 0,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  async deleteGoods(ctx: Koa.Context) {
    const { id } = ctx.query as any;
    try {
      const goods = await goodsServers.findOneGoods(id);
      goods.goodsImgs.split(',').forEach((path) => {
        if (path) {
          fs.unlinkSync(path);
        }
      });
      await goodsServers.deleteGoods(Number(id));
      ctx.body = {
        code: 0,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
}

export const goodsController = new GoodsController();
