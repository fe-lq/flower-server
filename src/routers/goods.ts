import Router from "koa-router";
import { goodsController } from "../controller/goods";

export const router = new Router({ prefix: "/goods" });

router.get("/getUsers", goodsController.getUsers);
