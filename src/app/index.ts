import Koa from "koa";
import body from "koa-body";
import router from "../routers";
import { httpLog } from "../middleware";

const app = new Koa();

app.use(body());
app.use(httpLog);

app.use(router.routes());

export default app;
