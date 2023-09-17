import fs from "fs";
import Router from "koa-router";

const router = new Router();

fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.ts") {
    const { router: subRouter } = require(`./${file}`);
    if (subRouter) {
      router.use(subRouter.routes());
    } else {
      console.log("路由配置命名不规范，要导出router");
    }
  }
});

export default router;
