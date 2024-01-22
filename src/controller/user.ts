import type Koa from "koa";
import { userServers } from "../services/user";
import { emitError } from "../utils/error";
import { BAD_REQUEST, JWT_SECRET_KEY, TOKEN_EXPIRED_TIME } from "../constants";
import JWT from "jsonwebtoken";
import { getPasswordHash } from "../utils";
import { cipherDecipher } from "../utils/cipher-decipher";

class UserController {
  // 注册
  async register(ctx: Koa.Context) {
    const requestParams = ctx.request.body;
    try {
      const pwdHex = getPasswordHash(requestParams.password);
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
      const user = await userServers.getUserDetail({
        phone,
      });
      if (user) {
        const pwdHex = getPasswordHash(password);
        if (user.password !== pwdHex) {
          emitError(ctx, new Error("密码错误"), BAD_REQUEST);
        } else if (user.phone !== phone) {
          emitError(ctx, new Error("手机号错误"), BAD_REQUEST);
        } else {
          const token = JWT.sign({ password: pwdHex, phone }, JWT_SECRET_KEY, {
            expiresIn: TOKEN_EXPIRED_TIME,
          });
          ctx.body = {
            code: 0,
            data: {
              token,
            },
            message: "success",
          };
          ctx.status = 200;
        }
      } else {
        emitError(ctx, new Error("用户不存在"), BAD_REQUEST);
      }
    } catch (error) {
      emitError(ctx, error);
    }
  }

  async getUserList(ctx: Koa.Context) {
    const searchParams = ctx.request.body;
    try {
      const data = await userServers.getUserList(searchParams);
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

  async deleteUser(ctx: Koa.Context) {
    const { userId } = ctx.query;
    try {
      await userServers.deleteUser(Number(userId));
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  async updateUser(ctx: Koa.Context) {
    const requestParams = ctx.request.body;
    try {
      await userServers.updateUser(requestParams);
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  async getUserDetail(ctx: Koa.Context) {
    const { userId } = ctx.query;
    try {
      const data = await userServers.getUserDetail({
        userId: Number(userId),
      });
      const password = cipherDecipher.decryptionPwd(data.password);
      ctx.body = {
        code: 0,
        data: { ...data, password },
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
}

export const userController = new UserController();
