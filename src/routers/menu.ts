import Router from "koa-router";
import { menuController } from "../controller/menu";
import { fileMiddles, checkMenuMiddle, genVerifyParams } from "../middleware";
import { addMenuSchema } from "../constants/validate-rules";

export const router = new Router({ prefix: "/menu" });

router.get("/icons", menuController.getIcons);
router.post("/icon/upload", ...fileMiddles("icons"), menuController.uploadIcon);
router.post("/icon/delete", menuController.deleteIcon);
router.post(
  "/add",
  genVerifyParams(addMenuSchema),
  checkMenuMiddle,
  menuController.addMenuItem
);
router.post("/list", menuController.getMenuList);
router.get("/delete", menuController.deleteMenuItem);
router.post(
  "/update",
  genVerifyParams(addMenuSchema),
  checkMenuMiddle,
  menuController.updateMenuItem
);
