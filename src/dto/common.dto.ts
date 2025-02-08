import { IsNumber, IsString, IsObject } from 'class-validator';

export class PaginationParams {
  @IsNumber()
  page?: number; // 当前页码

  @IsNumber()
  pageSize?: number; // 每页显示条数
}

export class BaseResponse<T = any> {
  @IsNumber()
  code: number;

  @IsString()
  message: string;

  @IsObject()
  data?: T;
}
