import Koa from "koa";
import body from "koa-body";
import router from "../routers";
import { httpLog, setHttpHeader } from "../middleware";
import { logger } from "../logs";

const app = new Koa();
app.use(
  body({
    onError: (err) => {
      // 处理错误
      logger.error(err.message);
    },
  })
);
app.use(httpLog);
app.use(setHttpHeader);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
