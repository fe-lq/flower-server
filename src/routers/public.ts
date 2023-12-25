import Router from "koa-router";
import fs from "fs";
import staticCache from "koa-static-cache";
import koaBody from "koa-body";
import path from "path";
import { handlerError } from "../utils/error";

export const router = new Router({ prefix: "/files" });

/**
 * 文件上传接口
 */
router.post(
  "/upload",
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../../public/files"),
      keepExtensions: true,
    },
  }),
  staticCache(path.join(__dirname, "../../public")),
  (ctx) => {
    try {
      const file = ctx.request.files.files;
      ctx.body = {
        code: 0,
        data: file,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      handlerError(ctx, error, 400);
    }
  }
);

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
    handlerError(ctx, error);
  }
});

/**
 * 上传icon接口
 */
router.post(
  "/icon/upload",
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../../public/icons"),
      keepExtensions: true,
    },
  }),
  staticCache(path.join(__dirname, "../../public")),
  (ctx) => {
    try {
      const file = ctx.request.files.file;
      ctx.body = {
        code: 0,
        data: file,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      handlerError(ctx, error, 400);
    }
  }
);

/**
 * 文件删除接口
 */
router.post("/icon/delete", (ctx) => {
  try {
    /**
     * 当静态文件夹部署在服务器是用filepath
     *
     * 本地测试先用newFilename
     * 所以先拼接/Users/lq/Desktop/lq_project/flower-server/public/icons
     */
    // /Users/lq/Desktop/lq_project/flower-server/public/icons
    const path = ctx.request.body.filePath;
    fs.unlinkSync(
      `/Users/lq/Desktop/lq_project/flower-server/public/icons/${path}`
    );
    ctx.body = {
      code: 0,
      message: "success",
    };
    ctx.status = 200;
  } catch (error) {
    handlerError(ctx, error);
  }
});
