import { goodsServers } from '../services/goods';
import { publicServers } from '../services/public';
import { Controller, Security, Route, Tags, Post, Get, Body, Query } from '@tsoa/runtime';
import { Goods } from '../types/prismaTypes';

@Tags('商品接口')
@Security('jwt')
@Route('goods')
export class GoodsController extends Controller {
  @Post('getList')
  async getGoods(@Body() requestParams: Required<Pick<Goods, 'goodsName' | 'goodsOnSale'>>) {
    const res = await goodsServers.getGoods(requestParams);
    return res.map((item) => ({
      ...item,
      goodsImgs: item.goodsImgs.split(',')
    }));
  }

  @Post('create')
  async createGoods(@Body() requestParams: Omit<Goods, 'id'> & { goodsImgs: string[] }) {
    await goodsServers.addGoods(requestParams);
  }

  @Post('update')
  async updateGoods(@Body() requestParams: Goods & { goodsImgs: string[] }) {
    await goodsServers.updateGoods(requestParams);
  }

  @Get('delete')
  async deleteGoods(@Query() id: number) {
    const goods = await goodsServers.findOneGoods(Number(id));
    await Promise.all(
      goods.goodsImgs.split(',').map(async (path) => {
        const fileName = path.split('/').pop();
        return await publicServers.deleteOssFile(`files/${fileName}`);
      })
    );
    await goodsServers.deleteGoods(Number(id));
  }
}

export const goodsController = new GoodsController();
