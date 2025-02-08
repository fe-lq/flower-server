import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsNumber,
  IsBoolean,
  IsObject,
  IsArray
} from 'class-validator';
import { Users } from '@prisma/client';

/**
 * 用户基础数据传输对象
 */
export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @IsString()
  @IsPhoneNumber('CN', { message: '请输入正确的手机号' })
  @IsNotEmpty({ message: '手机号不能为空' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  /** 可选的邮箱地址 */
  @IsString()
  email?: string;

  /** 可选的权限ID */
  @IsNumber()
  permissionId?: number;

  /** 用户状态标志 */
  @IsBoolean()
  status: boolean;
}

/**
 * 用户注册请求对象
 * @class RegisterRequest
 */
export class RegisterRequest {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @IsString()
  @IsPhoneNumber('CN', { message: '请输入正确的手机号' })
  phone: string;

  /** 可选的邮箱地址 */
  @IsString()
  email?: string;

  /** 可选的权限ID */
  @IsNumber()
  permissionId?: number;
}

/**
 * 用户登录请求对象
 * @class LoginRequest
 */
export class LoginRequest {
  @IsString()
  @IsPhoneNumber('CN', { message: '请输入正确的手机号' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

/**
 * 用户搜索参数对象
 */
export class SearchParams extends CreateUserDto {
  @IsNumber()
  page?: number; // 当前页码

  @IsNumber()
  pageSize?: number; // 每页显示条数
}

/**
 * 登录响应对象
 * @class LoginResponse
 */
export class LoginResponse {
  /** JWT访问令牌 */
  @IsString()
  token: string;

  /** 完整的用户信息 */
  @IsObject()
  user: Users;
}

/**
 * 用户信息响应对象
 * @class UserInfoResponse
 */
export class UserInfoResponse {
  /** 部分用户信息 */
  @IsObject()
  user: Partial<Users>;

  /**
   * 用户菜单列表
   * @todo 建议定义具体的菜单项类型替代 any[]
   */
  @IsArray()
  menuList: any[];
}
