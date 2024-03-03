import Router from "koa-router";
import { userController } from "../controller/user";
import { genVerifyParams } from "../middleware/validator-middle";
import { addUserSchema } from "../constants/validate-rules";

/**
 * 用户接口路由
 */
export const router = new Router({ prefix: "/users" });

router.post(
  "/register",
  genVerifyParams(addUserSchema),
  userController.register
);
router.post("/login", userController.login);
router.post("/list", userController.getUserList);
router.post("/add", genVerifyParams(addUserSchema), userController.register);
router.post("/update", userController.updateUser);
router.get("/delete", userController.deleteUser);
router.get("/read", userController.getUserDetail);
router.get("/info", userController.getUserInfo);
router.get("/logout", userController.loginOut);
