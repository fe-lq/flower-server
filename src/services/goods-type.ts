import db, { GoodsTypes } from '../db';
import { RequiredPick } from '../types/common';
class GoodsTypeServers {
  /**
   * 查询商品分类接口
   * @param params
   */
  getTypes = async (
    params: RequiredPick<GoodsTypes, 'typeCode' | 'typeName'>
  ): Promise<GoodsTypes[]> =>
    await db.goodsTypes.findMany({
      where: {
        typeCode: {
          contains: params.typeCode
        },
        typeName: {
          contains: params.typeName
        }
      }
    });

  /**
   * 添加商品分类接口
   * @param data
   */
  addType = async (data: GoodsTypes): Promise<GoodsTypes> => await db.goodsTypes.create({ data });

  /**
   * 更新商品分类接口
   * @param params
   */
  updateType = async (data: GoodsTypes): Promise<GoodsTypes> =>
    await db.goodsTypes.update({
      where: { id: data.id },
      data
    });

  /**
   * 删除商品分类接口
   * @param params
   */
  deleteType = async (id: number): Promise<GoodsTypes> =>
    await db.goodsTypes.delete({
      where: { id }
    });
}
export const goodsTypeServers = new GoodsTypeServers();
