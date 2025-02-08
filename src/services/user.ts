import { omit } from 'lodash';
import db, { Prisma } from '../db';
import { SearchParams } from '../dto/user.dto';

class UserServers {
  // 注册接口
  register = async (data: Prisma.UsersCreateInput) => await db.users.create({ data });

  // 查询用户接口
  getUserList = async (params: SearchParams) => {
    const limit = params.pageSize ?? 100;
    return await db.users.findMany({
      include: {
        permission: { select: { roleName: true } }
      },
      where: {
        AND: {
          userName: {
            contains: params.userName
          },
          phone: {
            contains: params.phone
          },
          status: params.status
        }
      },
      take: limit,
      skip: ((params.page ?? 1) - 1) * limit
    });
  };

  // 编辑用户接口
  updateUser = async (data: Prisma.UsersUpdateInput & { userId: number }) =>
    await db.users.update({
      where: {
        userId: data.userId
      },
      data: omit(data, 'userId')
    });

  // 删除用户接口
  deleteUser = async (userId: number) => await db.users.delete({ where: { userId } });
  // 查询单个用户接口
  getUserDetail = async (user: Prisma.UsersWhereUniqueInput) =>
    await db.users.findUnique({ where: user });
}

/**
 * 用户相关接口
 */
export const userServers = new UserServers();
