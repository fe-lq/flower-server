import Koa from 'koa';

import { RegisterRoutes } from '../routers';
import {
  jwtAuthMiddle,
  httpLogMiddle,
  parseBodyMiddle,
  corsMiddleware,
  responseFormatter
} from '../middleware';
import Router from '@koa/router';
const router = new Router();

const app = new Koa();
app.use(parseBodyMiddle);
app.use(httpLogMiddle);
app.use(corsMiddleware);
app.use(jwtAuthMiddle);
app.use(responseFormatter);
RegisterRoutes(router);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
