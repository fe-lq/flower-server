import fs from "fs";
import Router from "koa-router";

const router = new Router();
/**
 * 自动读取routers文件夹下的路由；
 * 关键点：路由文件需以 router 命名导出
 */
fs.readdirSync(__dirname).forEach((file) => {
  if (!file.startsWith("index")) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { router: subRouter } = require(`./${file}`);
    if (subRouter) {
      router.use(subRouter.routes());
    } else {
      console.log("路由配置命名不规范，要导出‘router’名称路由");
    }
  }
});

export default router;
