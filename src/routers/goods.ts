import Router from "koa-router";
import { goodsController } from "../controller/goods";

export const router = new Router({ prefix: "/goods" });

router.post("/getList", goodsController.getGoods);
router.post("/create", goodsController.createGoods);
router.post("/update", goodsController.updateGoods);
router.get("/delete", goodsController.deleteGoods);
