import Router from 'koa-router';
import { goodsTypeController } from '../controller/goods-type';
import { validateGoodsType, validateGoodsTypeUpdate } from '../middleware/goods-type';

export const router = new Router({ prefix: '/category' });

/** 商品分类 */
router.post('/list', goodsTypeController.getTypeList);
router.post('/add', validateGoodsType, goodsTypeController.addType);
router.post('/update', validateGoodsType, goodsTypeController.updateType);
router.post('/delete', validateGoodsTypeUpdate, goodsTypeController.deleteType);
