import { goodsTypeServers } from '../services/goods-type';
import { omit } from 'lodash';
import { Controller, Security, Route, Tags, Post, Get, Body, Query } from '@tsoa/runtime';
import { GoodsTypes } from '../types/prismaTypes';
import { validateGoodsType, validateGoodsTypeUpdate } from '../middleware/goods-type';
import { Validate } from 'class-validator';

@Tags('商品类型接口')
@Security('jwt')
@Route('goods-type')
export class GoodsTypeController extends Controller {
  /**
   * 获取商品类型列表
   * @param requestParams
   */
  @Post('list')
  async getTypeList(
    @Body() requestParams: Required<Pick<GoodsTypes, 'typeParentId' | 'typeEnable'>>
  ) {
    const res = await goodsTypeServers.getTypes(requestParams);
    return {
      code: 0,
      data: res.map((item) => ({
        ...omit(item, ['typeParent', 'goods']),
        typeParentName: item.typeParent?.typeName
      })),
      message: 'success'
    };
  }

  /**
   * 添加商品类型
   * @param requestParams
   */
  @Post('add')
  @Validate(validateGoodsType)
  async addType(@Body() requestParams: Omit<GoodsTypes, 'id'>) {
    const res = await goodsTypeServers.addType(requestParams);
    return {
      code: 0,
      data: res,
      message: 'success'
    };
  }

  /**
   * 更新商品类型
   * @param requestParams
   */
  @Post('update')
  @Validate(validateGoodsType)
  async updateType(@Body() requestParams: GoodsTypes) {
    const res = await goodsTypeServers.updateType(requestParams);
    return {
      code: 0,
      data: res,
      message: 'success'
    };
  }

  /**
   * 删除商品类型
   * @param id
   */
  @Get('delete')
  @Validate(validateGoodsTypeUpdate)
  async deleteType(@Query() id: number) {
    const res = await goodsTypeServers.deleteType(Number(id));
    return {
      code: 0,
      data: res,
      message: 'success'
    };
  }
}

export const goodsTypeController = new GoodsTypeController();
