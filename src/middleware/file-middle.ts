import koaBody from "koa-body";
import staticCache from "koa-static-cache";
import path from "path";
import { getCurrentPath } from "../utils";

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
        uploadDir: getCurrentPath(dir),
        keepExtensions: true,
        filename: (name, ext) => {
          return `${name}${ext}`;
        },
      },
    }),
    staticCache(path.join(__dirname, "../../public")),
  ];
};
