import type Koa from 'koa';
import { goodsTypeServers } from '../services/goods-type';

/**
 * 验证商品类型是否存在
 * @param ctx
 * @param next
 */
export const validateGoodsTypeUpdate = async (ctx: Koa.Context, next: Koa.Next) => {
  const { id } = ctx.request.body as any;
  const { children, goods } = (await goodsTypeServers.getTypes({ id }))[0];
  // 判断时候有关联的子类型
  if (children.length) {
    throw new Error('存在关联的子类型，无法删除');
  } else if (goods.length) {
    throw new Error('存在关联的商品，无法删除');
  } else {
    await next();
  }
};

/**
 * 验证商品类型是否存在
 * @param ctx
 * @param next
 */
export const validateGoodsType = async (ctx: Koa.Context, next: Koa.Next) => {
  const { typeName } = ctx.request.body as any;
  const goodsType = (await goodsTypeServers.getTypes({ typeName }))[0];
  if (goodsType) {
    throw new Error('该分类名称已存在，请重新输入');
  }
  await next();
};
