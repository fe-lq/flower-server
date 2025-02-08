import { Request } from 'koa';
import { validateTokenMiddle } from './http-middle';

export function koaAuthentication(request: Request, securityName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (securityName === 'jwt') {
      // 调用你的验证中间件
      const ctx = request.ctx;
      validateTokenMiddle(ctx, async () => {
        try {
          // 如果验证通过，返回用户信息
          const user = ctx.state.user;
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }).catch(reject);
    } else {
      reject(new Error('未知的认证方式'));
    }
  });
}
