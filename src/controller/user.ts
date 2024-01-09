import type Koa from "koa";
import { userServers } from "../services/user";
import { cipherDecipher } from "../utils/cipher-decipher";
import { emitError } from "../utils/error";

class UserController {
  // 注册
  async register(ctx: Koa.Context) {
    const requestParams = ctx.request.body;
    try {
      // 加密密码
      const { pwdHex } = cipherDecipher.encryptionPwd(requestParams.password);
      console.log(pwdHex, "密码");

      await userServers.register({ ...requestParams, password: pwdHex });
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.response.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  // 登录
  async login(ctx: Koa.Context) {
    const { password, phone } = ctx.request.body;
    try {
      const data = await userServers.login({ password, phone });
      ctx.body = {
        code: 0,
        data,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
}

export const userController = new UserController();
