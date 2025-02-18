import Koa from 'koa';

import { RegisterRoutes } from '../routers';
import {
  jwtAuthMiddle,
  httpLogMiddle,
  parseBodyMiddle,
  corsMiddleware,
  responseFormatter,
  filterNullKey
} from '../middleware';
import Router from '@koa/router';
const router = new Router();

const app = new Koa();
app.use(corsMiddleware);
app.use(parseBodyMiddle);
app.use(httpLogMiddle);
app.use(jwtAuthMiddle);
app.use(filterNullKey);

// 先注册路由
RegisterRoutes(router);
// 最后使用响应格式化中间件
app.use(responseFormatter);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
