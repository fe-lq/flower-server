import { menuServers } from '../services/menu';
import { publicServers } from '../services/public';
import {
  Security,
  Route,
  Tags,
  Get,
  Post,
  Middlewares,
  Response,
  UploadedFile,
  Body,
  Query
} from '@tsoa/runtime';
import { fileMiddles } from '../middleware/file-middle';
import { genVerifyParams } from '../middleware/validator-middle';
import { addMenuSchema } from '../constants/validate-rules';
import { checkMenuMiddle } from '../middleware/menu-middle';
import { CreateMenuDto, UpdateMenuDto } from '../dto/menu.dto';
import { Controller } from '@tsoa/runtime';

@Tags('菜单管理')
@Security('jwt')
@Route('menu')
export class MenuController extends Controller {
  // 获取图标
  @Get('icons')
  async getIcons() {
    return await menuServers.getMenuIcons();
  }

  // 上传图标
  @Post('icon/upload')
  @Middlewares(fileMiddles())
  @Response(200, 'Success')
  @Response(400, 'Bad Request')
  async uploadIcon(@UploadedFile() file: Express.Multer.File) {
    const ossFile = await publicServers.putOssFile(`icons/${file.originalname}`, file.path);
    return {
      ...file,
      path: ossFile.url
    };
  }

  // 删除图标
  @Post('icon/delete')
  async deleteIcon(@Body() body: { filePath: string }) {
    const path = body.filePath;
    const fileName = path.split('/').pop();
    await publicServers.deleteOssFile(`icons/${fileName}`);
  }

  // 添加菜单项
  @Post('add')
  @Middlewares([genVerifyParams(addMenuSchema), checkMenuMiddle])
  async addMenuItem(@Body() data: CreateMenuDto) {
    await menuServers.addMenu(data);
  }

  // 获取菜单列表
  @Post('list')
  async getMenuList(@Body() data: CreateMenuDto) {
    return await menuServers.getMenuList(data);
  }

  // 更新菜单项
  @Post('update')
  @Middlewares([genVerifyParams(addMenuSchema), checkMenuMiddle])
  async updateMenuItem(@Body() data: CreateMenuDto & { id: number }) {
    await menuServers.updateMenu(data);
  }

  // 更新菜单顺序
  @Post('updateSort')
  async updateMenuSort(@Body() data: UpdateMenuDto[]) {
    await menuServers.updateMenuSort(data);
  }

  // 删除菜单项
  @Get('delete')
  async deleteMenuItem(@Query() id: number) {
    await menuServers.deleteMenu(Number(id));
  }
}

export const menuController = new MenuController();
