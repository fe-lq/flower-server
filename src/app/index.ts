import Koa from 'koa';

import router from '../routers';
import {
  jwtAuthMiddle,
  httpLogMiddle,
  parseBodyMiddle,
  corsMiddleware,
  validateTokenMiddle
} from '../middleware';

const app = new Koa();
app.use(parseBodyMiddle);
app.use(httpLogMiddle);
app.use(corsMiddleware);
app.use(jwtAuthMiddle);
app.use(validateTokenMiddle);
app.use(router.routes());
app.use(router.allowedMethods());

export default app;
