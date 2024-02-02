import { createClient } from "redis";

const client = createClient({ url: "redis://127.0.0.1:6379" });
/**
 * 使用redis存储一些临时值
 */
class RedisClient {
  initRedis() {
    client.on("error", (err) => console.log("Redis Client Error", err));
    client.connect();
    client.on("end", function () {
      console.log("redis connection has closed");
    });
  }

  async setValue(key: string, value: string, time?: number) {
    if (time) {
      await client.set(key, value, {
        // 有效期  秒
        EX: time,
        // 毫秒
        // PX
      });
    } else {
      await client.set(key, value);
    }
  }
  async getValue(key: string) {
    return await client.get(key);
  }
  async deleteValue(key: string) {
    await client.del(key);
  }
}

export const redisClient = new RedisClient();