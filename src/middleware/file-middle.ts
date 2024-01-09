import koaBody from "koa-body";
import staticCache from "koa-static-cache";
import path from "path";

/**
 *
 * @param path public下的文件夹
 * @returns
 */
export const fileMiddles = (dir = "files") => {
  return [
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, `../../public/${dir}`),
        keepExtensions: true,
      },
    }),
    staticCache(path.join(__dirname, "../../public")),
  ];
};
