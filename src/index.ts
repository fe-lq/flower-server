import app from './app';
import { redisClient } from './redis';
import dotenv from 'dotenv';
dotenv.config(); // 加载 .env 文件
redisClient.initRedis();
app.listen(8880, () => {
  console.log('8880启动成功');
});
