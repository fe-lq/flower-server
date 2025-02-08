import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class PermissionDto {
  @IsString()
  userName: string;

  @IsString()
  @IsNotEmpty({ message: '角色名称不能为空' })
  roleName: string;

  @IsArray()
  @IsNotEmpty({ message: '成员不能为空' })
  members: number[];

  @IsArray()
  permissionScope: number[];
}
