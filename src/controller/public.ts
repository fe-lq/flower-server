import type Koa from 'koa';
import { emitError } from '../utils/error';
import { BAD_REQUEST } from '../constants';
import { publicServers } from '../services/public';
class PublicController {
  // 上传文件
  uploadFile = async (ctx: Koa.Context) => {
    try {
      const file = ctx.request.files.files as any;
      const ossFile = await publicServers.putOssFile(
        `files/${file.originalFilename}`,
        file.filepath
      );
      ctx.body = {
        code: 0,
        data: {
          filename: file.originalFilename,
          path: ossFile.url
        },
        message: 'success'
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
      const fileName = path.split('/').pop();
      await publicServers.deleteOssFile(`files/${fileName}`);
      ctx.body = {
        code: 0,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error, BAD_REQUEST);
    }
  };
}
export const publicController = new PublicController();
