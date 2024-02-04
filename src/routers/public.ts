import Router from "koa-router";
import { fileMiddles } from "../middleware/file-middle";
import { publicController } from "../controller/public";

export const router = new Router({ prefix: "/files" });

/**
 * 文件上传接口
 */
router.post("/upload", ...fileMiddles(), publicController.uploadFile);

/**
 * 文件删除接口
 */
router.post("/delete", publicController.deleteFile);
