import Router from "koa-router";
import fs from "fs";
import { emitError } from "../utils/error";
import { fileMiddles } from "../middleware/file-middle";
import { BAD_REQUEST } from "../constants";

export const router = new Router({ prefix: "/files" });

/**
 * 文件上传接口
 */
router.post("/upload", ...fileMiddles(), (ctx) => {
  try {
    const file = ctx.request.files.files;
    ctx.body = {
      code: 0,
      data: file,
      message: "success",
    };
    ctx.status = 200;
  } catch (error) {
    emitError(ctx, error, BAD_REQUEST);
  }
});

/**
 * 文件删除接口
 */
router.post("/delete", (ctx) => {
  try {
    const path = ctx.request.body.filePath;
    fs.unlinkSync(path);
    ctx.body = {
      code: 0,
      message: "success",
    };
    ctx.status = 200;
  } catch (error) {
    emitError(ctx, error);
  }
});
