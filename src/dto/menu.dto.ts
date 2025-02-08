import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  icon?: string;

  @IsString()
  @IsNotEmpty({ message: '菜单名称不能为空' })
  menuName: string;

  @IsString()
  @IsNotEmpty({ message: '菜单地址不能为空' })
  menuPath: string;

  @IsNumber()
  permNode?: number;

  @IsNumber()
  level: number;

  @IsNumber()
  parentId: number;

  @IsNumber()
  permissionId: number;
}

export class UpdateMenuDto extends CreateMenuDto {
  @IsNumber()
  id: number;

  @IsNumber()
  level: number;

  @IsArray()
  children: UpdateMenuDto[];
}
