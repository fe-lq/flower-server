import type koa from "koa";
import Router from "koa-router";

export const router = new Router({ prefix: "/users" });

router.get("/register", async (ctx: koa.Context) => {
  console.log(ctx.query.user);
  ctx.body = {
    code: 0,
    message: "用户登录成功",
  };
});
