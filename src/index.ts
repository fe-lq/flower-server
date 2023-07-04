import koa from "koa";
import Router from "koa-router";
import Logger from 'koa-logger';
import body from "koa-body";
import Moment from 'moment'

const app = new koa();
const router = new Router();
const logger = Logger(msg => console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + msg));

app.use(body());
app.use(logger);

router.get("/test", async (ctx: koa.Context) => {
  ctx.body = "第一个请求 test";
  console.log("请求日志");
});

app.use(router.routes());

app.listen(8880);

console.log("程序运行在3002端口");
