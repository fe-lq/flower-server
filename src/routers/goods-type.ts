import Router from 'koa-router';
import { goodsTypeController } from '../controller/goods-type';
import { validateGoodsType } from '../middleware/goods-type';

export const router = new Router({ prefix: '/category' });

/** 商品分类 */
router.post('/list', goodsTypeController.getTypeList);
router.post('/add', goodsTypeController.addType);
router.post('/update', goodsTypeController.updateType);
router.post('/delete', validateGoodsType, goodsTypeController.deleteType);
