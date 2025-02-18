import { PermissionDto } from '../dto/permission.dto';
import { permissionServer } from '../services/permission';
import { Get, Post, Route, Tags, Body, Query, Response, Controller } from '@tsoa/runtime';

@Tags('权限管理')
@Route('permission')
export class PermController extends Controller {
  /**
   * 获取权限列表
   * @param queryParams 查询参数
   */
  @Post('list')
  @Response(200, 'Success')
  @Response(400, 'Bad Request')
  async getPermissions(@Body() queryParams: PermissionDto) {
    return await permissionServer.getPerms(queryParams);
  }

  /**
   * 添加权限
   * @param params 权限信息
   */
  @Post('add')
  @Response(200, 'Success')
  @Response(400, 'Bad Request')
  async addPermission(@Body() params: Omit<PermissionDto, 'userName'>) {
    return await permissionServer.addPerm(params);
  }

  /**
   * 更新权限
   * @param permData 权限更新数据
   */
  @Post('update')
  @Response(200, 'Success')
  @Response(400, 'Bad Request')
  async updatePermission(@Body() permData: Partial<PermissionDto> & { id: number }) {
    return await permissionServer.updatePerm(permData);
  }

  /**
   * 删除权限
   * @param id 权限ID
   */
  @Get('delete')
  @Response(200, 'Success')
  @Response(400, 'Bad Request')
  async deletePermission(@Query() id: number) {
    return await permissionServer.deletePerm(Number(id));
  }
}

export const permController = new PermController();
