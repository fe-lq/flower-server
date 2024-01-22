import app from "./app";
import { redisClient } from "./redis";
redisClient.initRedis();
app.listen(8880, () => {
  console.log("8880启动成功");
});
