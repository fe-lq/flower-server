import Router from "koa-router";
import { userController } from "../controller/user";

/**
 * 用户接口路由
 */
export const router = new Router({ prefix: "/users" });

router.post("/register", userController.register);

// router.post("/login", userController.register);
// router.post("/logout", userController.register);
