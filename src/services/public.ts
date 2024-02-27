import OSS from "ali-oss";
import path from "path";
const clientOss = new OSS({
  region: "oss-cn-hangzhou", // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
  bucket: "lq-oss2024", // 示例：'my-bucket-name'，填写存储空间名称。
});

class PublicServers {
  /**
   *
   * @param prefix OSS上文件存放的文件夹
   * @returns 文件信息list
   */
  getOssFiles = async (prefix: string): Promise<OSS.ObjectMeta[]> => {
    const res = await clientOss.list({ prefix, "max-keys": 100 }, {});
    return res.objects;
  };

  /**
   *
   * @param fileName 对应OSS里的文件名
   * @param filePath 本地文件的完整路径
   * @returns
   */
  putOssFile = async (fileName: string, filePath: string) => {
    const headers = {
      // 指定Object的存储类型。
      "x-oss-storage-class": "Standard",
      // 通过文件URL访问文件时，指定以附件形式下载文件。
      "Content-Disposition": "attachment;",
      // 设置Object的标签，可同时设置多个标签。
      "x-oss-tagging": "Tag1=icon",
      // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
      "x-oss-forbid-overwrite": "false",
    };
    return await clientOss.put(
      fileName,
      path.normalize(filePath),
      // 自定义headers
      { headers }
    );
  };

  /**
   *
   * @param fileName 对应OSS里的文件名
   * @returns
   */
  deleteOssFile = async (fileName: string) => await clientOss.delete(fileName);
}
export const publicServers = new PublicServers();
