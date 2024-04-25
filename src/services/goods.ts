import db, { Goods } from '../db';
import { RequiredPick } from '../types/common';
class GoodsServers {
  /**
   * 查询商品接口
   * @param params
   */
  getGoods = async (params: RequiredPick<Goods, 'goodsName' | 'goodsOnSale'>) =>
    await db.goods.findMany({
      where: {
        ...params,
        goodsName: {
          contains: params.goodsName
        },
        goodsIsDel: false
      },
      include: {
        goodsType: true
      }
    });

  /**
   * 添加商品接口
   * @param data
   */
  addGoods = async (data: Goods): Promise<Goods> => await db.goods.create({ data });

  /**
   * 更新商品接口
   * @param params
   */
  updateGoods = async (data: Goods): Promise<Goods> =>
    await db.goods.update({
      where: { id: data.id },
      data
    });

  /**
   * 批量删除商品接口
   * @param params
   */
  deleteMultipleGoods = async (
    params: Parameters<typeof db.goods.deleteMany>[number]['where']
  ): Promise<{ count: number }> =>
    await db.goods.deleteMany({
      where: params
    });

  /**
   * 删除商品接口
   * @param params
   */
  deleteGoods = async (id: number): Promise<Goods> =>
    await db.goods.delete({
      where: { id }
    });

  /**
   * 查找单个商品
   */
  findOneGoods = async (id: number): Promise<Goods | null> =>
    await db.goods.findUnique({ where: { id } });
}
export const goodsServers = new GoodsServers();
