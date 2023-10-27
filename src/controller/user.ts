import type Koa from "koa";
import { userServers } from "../services/user";
import { Prisma } from "@prisma/client";
import { logger } from "../logs";
import { HeadFieldConfig } from "../constants";

class UserController {
  async register(ctx: Koa.Context) {
    const requestParams = ctx.request.body;
    try {
      await userServers.register(requestParams);
      ctx.body = {
        code: 0,
        message: "用户登录成功",
      };
      ctx.response.status = 201;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const { code, meta } = error;
        if (code === "P2002") {
          const field = (meta.target as string).split("_")[0];
          ctx.body = {
            code: -1,
            message: `${field}已存在`,
          };
          ctx.response.status = 404;
        }
      } else {
        ctx.body = {
          code: -1,
          message: `error request`,
        };
        ctx.response.status = 404;
      }
      logger.error({
        requestId: ctx.request.header[HeadFieldConfig.REQUEST_ID],
        errorInfo: error,
      });
    }
  }
}

export const userController = new UserController();
