import { omit } from 'lodash';
import db, { GoodsTypes } from '../db';
class GoodsTypeServers {
  /**
   * 查询商品分类接口
   * @param params
   */
  getTypes = async (params: Partial<GoodsTypes>) =>
    await db.goodsTypes.findMany({
      where: {
        id: params.id,
        typeName: {
          contains: params.typeName
        },
        typeEnable: params.typeEnable
      },
      include: {
        typeParent: {
          select: {
            typeName: true
          }
        },
        children: true,
        goods: true
      }
    });

  /**
   * 添加商品分类接口
   * @param data
   */
  addType = async (data: GoodsTypes) => await db.goodsTypes.create({ data });

  /**
   * 更新商品分类接口
   * @param params
   */
  updateType = async (data: GoodsTypes) =>
    await db.goodsTypes.update({
      where: { id: data.id },
      data: omit(data, ['id', 'typeParentName'])
    });

  /**
   * 删除商品分类接口
   * @param params
   */
  deleteType = async (id: number) =>
    await db.goodsTypes.delete({
      where: { id }
    });
}
export const goodsTypeServers = new GoodsTypeServers();
