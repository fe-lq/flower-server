import Koa from "koa";
import body from "koa-body";
import router from "../routers";
import { httpLog, setHttpHeader } from "../middleware";

const app = new Koa();
app.use(body());
app.use(httpLog);
app.use(setHttpHeader);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
