import type koa from "koa";
import Router from "koa-router";

export const router = new Router({ prefix: "/goods" });

router.post("/add", async (ctx: koa.Context) => {
  console.log(ctx.body);
  return "添加成功";
});
