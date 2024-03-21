import { createClient } from 'redis';
import { logger } from '../logs';

const client = createClient({ url: process.env.REDIS_URL });
/**
 * 使用redis存储一些临时值
 */
class RedisClient {
  initRedis() {
    client.on('error', (err) => {
      logger.error(err.message);
    });
    client.connect();
    client.on('end', function () {
      logger.error('redis connection has closed');
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
