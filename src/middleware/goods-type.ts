import type Koa from 'koa';
import { goodsTypeServers } from '../services/goods-type';
import { emitError } from '../utils/error';
import { BAD_REQUEST } from '../constants';
export const validateGoodsType = async (ctx: Koa.Context, next: Koa.Next) => {
  const { id } = ctx.request.body as any;
  const { children, goods } = (await goodsTypeServers.getTypes({ id }))[0];
  // 判断时候有关联的子类型
  if (children.length) {
    emitError(ctx, { message: '存在关联的子类型，无法删除' }, BAD_REQUEST);
    return;
  } else if (goods.length) {
    emitError(ctx, { message: '存在关联的商品，无法删除' }, BAD_REQUEST);
    return;
  } else {
    await next();
  }
};
