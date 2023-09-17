import koa from "koa";
import Logger from "koa-logger";
import body from "koa-body";
import Moment from "moment";
import router from "../routers";

const app = new koa();
const logger = Logger((msg) =>
  console.log(Moment().format("YYYY-MM-DD HH:mm:ss") + msg)
);

app.use(body());
app.use(logger);

app.use(router.routes());

export default app;
