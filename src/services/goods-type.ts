import { omit } from 'lodash';
import db from '../db';
import { GoodsTypes } from '../types/prismaTypes';

class GoodsTypeServers {
  /**
   * 查询商品分类接口
   * @param params
   */
  getTypes = async (params: Partial<GoodsTypes>) =>
    await db.goodsTypes.findMany({
      where: {
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
  addType = async (data: Omit<GoodsTypes, 'id'>) =>
    await db.goodsTypes.create({
      data: {
        ...omit(data, ['typeParentId', 'children', 'goods']),
        typeParent: {
          connect: {
            id: data.typeParentId
          }
        }
      }
    });

  /**
   * 更新商品分类接口
   * @param params
   */
  updateType = async (data: GoodsTypes) =>
    await db.goodsTypes.update({
      where: { id: data.id },
      data: {
        ...omit(data, ['id', 'typeParentId', 'children', 'goods']),
        typeParent: {
          connect: {
            id: data.typeParentId
          }
        }
      }
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
