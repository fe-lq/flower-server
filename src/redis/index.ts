import { createClient } from 'redis';
// import { logger } from '../logs';

const client = createClient({ url: process.env.REDIS_URL });
/**
 * 使用redis存储一些临时值
 */
class RedisClient {
  errorTimes = 0;
  initRedis() {
    client.connect();
    client.on('error', (err) => {
      this.errorTimes++;
      console.log('Redis Client Error', err);
      // 尝试 5 次
      if (this.errorTimes >= 5) {
        client.disconnect();
      }

      // logger.error(err.message);
    });
    client.on('end', function () {
      console.log('redis connection has closed');
      // logger.error('redis connection has closed');
    });
  }

  async setValue(key: string, value: string, time?: number) {
    if (time) {
      await client.set(key, value, {
        // 有效期  秒
        EX: time
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
