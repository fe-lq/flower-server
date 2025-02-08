import { omit } from 'lodash';
import db from '../db';
import { Goods } from '../types/prismaTypes';
class GoodsServers {
  /**
   * 查询商品接口
   * @param params
   */
  getGoods = async (params: Required<Pick<Goods, 'goodsName' | 'goodsOnSale'>>) =>
    await db.goods.findMany({
      where: {
        ...params,
        goodsName: {
          contains: params.goodsName
        },
        goodsIsDel: false
      }
    });

  /**
   * 添加商品接口
   * @param data
   */
  addGoods = async (data: Omit<Goods, 'id'> & { goodsImgs: string[] }) =>
    await db.goods.create({
      data: {
        ...omit(data, ['goodsImgs', 'goodsTypeId', 'cartGoods', 'orderGoods', 'goodsComments']),
        goodsImgs: data.goodsImgs.join(','),
        goodsType: {
          connect: {
            id: data.goodsTypeId
          }
        }
      }
    });

  /**
   * 更新商品接口
   * @param params
   */
  updateGoods = async (data: Goods & { goodsImgs: string[] }) =>
    await db.goods.update({
      where: { id: data.id },
      data: {
        ...omit(data, [
          'goodsImgs',
          'goodsTypeId',
          'cartGoods',
          'orderGoods',
          'goodsComments',
          'id'
        ]),
        goodsImgs: data.goodsImgs.join(','),
        goodsType: {
          connect: {
            id: data.goodsTypeId
          }
        }
      }
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
  deleteGoods = async (id: number) =>
    await db.goods.delete({
      where: { id }
    });

  /**
   * 查找单个商品
   */
  findOneGoods = async (id: number) => await db.goods.findUnique({ where: { id } });
}
export const goodsServers = new GoodsServers();
