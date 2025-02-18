import koaBody from 'koa-body';

/**
 *
 * @param path public下的文件夹
 * @returns
 */
export function fileMiddles() {
  return koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      filename: (name, ext) => {
        return `${name}${ext}`;
      }
    }
  });
}
