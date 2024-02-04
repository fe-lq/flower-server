import type Koa from "koa";
import fs from "fs";
import { emitError } from "../utils/error";
import { BAD_REQUEST } from "../constants";
class PublicController {
  // 上传文件
  uploadFile = async (ctx: Koa.Context) => {
    try {
      const file = ctx.request.files.files as unknown as Koa.Request["files"];
      ctx.body = {
        code: 0,
        data: {
          filename: file.newFilename,
          path: `http://127.0.0.1:5500/public/files/${file.newFilename}`,
        },
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error, BAD_REQUEST);
    }
  };

  // 删除文件
  deleteFile = async (ctx: Koa.Context) => {
    try {
      const path = ctx.request.body.filePath;
      fs.unlinkSync(path);
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error, BAD_REQUEST);
    }
  };
}
export const publicController = new PublicController();
