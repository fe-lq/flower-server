import type Koa from 'koa';
import { goodsTypeServers } from '../services/goods-type';
import { emitError } from '../utils/error';
import { BAD_REQUEST } from '../constants';
export const validateGoodsTypeUpdate = async (ctx: Koa.Context, next: Koa.Next) => {
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

export const validateGoodsType = async (ctx: Koa.Context, next: Koa.Next) => {
  const { typeName } = ctx.request.body as any;
  const goodsType = (await goodsTypeServers.getTypes({ typeName }))[0];
  if (goodsType) {
    emitError(ctx, { message: '该分类名称已存在，请重新输入' }, BAD_REQUEST);
    return;
  }
  await next();
};
