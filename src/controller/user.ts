import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Route,
  Security,
  Header,
  Hidden,
  Tags
} from '@tsoa/runtime';
import { userServers } from '../services/user';
import { JWT_SECRET_KEY, TOKEN_EXPIRED_TIME } from '../constants';
import JWT, { JwtPayload } from 'jsonwebtoken';
import { genEncryptPsw, getPasswordHash } from '../utils';
import { omit } from 'lodash';
import { menuServers } from '../services/menu';
import { redisClient } from '../redis';
import { LoginRequest, CreateUserDto, SearchParams } from '../dto/user.dto';

@Tags('用户接口')
@Route('users')
export class UserController extends Controller {
  @Post('register')
  async register(@Body() requestParams: CreateUserDto) {
    const user = await userServers.getUserDetail({
      phone: requestParams.phone
    });

    if (user) {
      throw new Error('当前手机号已注册');
    }

    const pwdHex = getPasswordHash(requestParams.password);
    await userServers.register({
      ...requestParams,
      password: pwdHex,
      createDate: new Date()
    });
  }

  @Post('login')
  async login(@Body() params: LoginRequest) {
    const { password, phone } = params;
    const user = await userServers.getUserDetail({ phone });

    if (!user) {
      throw new Error('用户不存在');
    }

    const pwdHex = getPasswordHash(password);
    if (user.password !== pwdHex) {
      throw new Error('密码错误');
    }
    if (user.phone !== phone) {
      throw new Error('手机号错误');
    }
    if (!user.status) {
      throw new Error('该用户已被禁用，请联系其他管理员开启');
    }

    const token = JWT.sign({ password: pwdHex, phone }, JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRED_TIME
    });

    return { token, user };
  }

  @Get('logout')
  @Security('jwt')
  async loginOut(@Header('authorization') token: string) {
    const { user, exp, iat } = await this.getUserByToken(token);
    await redisClient.setValue(token, user.phone, exp - iat);
  }

  @Get('info')
  @Security('jwt')
  async getUserInfo(@Header('authorization') token: string) {
    const { user } = await this.getUserByToken(token);
    const menuList = await menuServers.getPermMenus({
      permissionId: user.permissionId === 1 ? undefined : user.permissionId
    });

    return {
      code: 0,
      message: 'success',
      data: {
        user: omit(user, 'password'),
        menuList
      }
    };
  }

  @Post('list')
  @Security('jwt')
  async getUserList(@Body() searchParams: SearchParams) {
    const data = await userServers.getUserList(searchParams);

    return data.map((user) => ({
      ...user,
      role: user.permission?.roleName
    }));
  }

  @Get('delete')
  @Security('jwt')
  async deleteUser(@Query() userId: string) {
    await userServers.deleteUser(Number(userId));
  }

  @Post('update')
  @Security('jwt')
  async updateUser(@Body() requestParams: Partial<CreateUserDto> & { userId: number }) {
    const pwdHex = getPasswordHash(requestParams.password);
    await userServers.updateUser({
      ...requestParams,
      password: pwdHex,
      userId: requestParams.userId
    });
  }

  @Get('read')
  @Security('jwt')
  async getUserDetail(@Query() userId: number) {
    const data = await userServers.getUserDetail({
      userId: Number(userId)
    });
    const password = genEncryptPsw(data.password);

    return { ...data, password };
  }

  @Hidden()
  async getUserByToken(token: string): Promise<any> {
    const { password, phone, exp, iat } = JWT.verify(
      token.split(' ')[1],
      JWT_SECRET_KEY
    ) as JwtPayload;
    const user = await userServers.getUserDetail({
      phone,
      password
    });
    return { user, exp: Number(exp), iat: Number(iat) };
  }
}

export const userController = new UserController();
