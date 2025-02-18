import { fileMiddles } from '../middleware/file-middle';
import { publicServers } from '../services/public';
import {
  Post,
  Delete,
  Tags,
  Route,
  Response,
  Body,
  UploadedFile,
  Middlewares,
  Controller
} from '@tsoa/runtime';

// 添加响应类型接口
interface UploadResponse {
  filename: string;
  path: string;
}

@Tags('公共接口')
@Route('public')
export class PublicController extends Controller {
  /**
   * 上传文件接口
   */
  @Post('uploadFile')
  @Middlewares(fileMiddles())
  @Response<UploadResponse>(200, 'Success')
  @Response(400, 'Bad Request')
  async uploadFile(@UploadedFile() files: Express.Multer.File): Promise<UploadResponse> {
    const ossFile = await publicServers.putOssFile(`files/${files.originalname}`, files.path);

    return {
      filename: files.originalname,
      path: ossFile.url
    };
  }

  /**
   * 删除文件接口
   */
  @Delete('deleteFile')
  @Response(200, 'Success')
  @Response(400, 'Bad Request')
  async deleteFile(@Body() body: { filePath: string }) {
    const fileName = body.filePath.split('/').pop();
    await publicServers.deleteOssFile(`files/${fileName}`);
  }
}
