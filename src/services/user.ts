import db, { Users } from "../db";
import { UserParams } from "../types/user";

class UserServers {
  // 注册接口
  register = async (data: Users): Promise<Users> =>
    await db.users.create({ data });
  // loginOut = async (data: Users): Promise<Users> => await db.users.create({ data });

  // 查询用户接口
  getUserList = async (params: UserParams): Promise<Users[]> => {
    const limit = params.pageSize ?? 100;
    return await db.users.findMany({
      where: {
        AND: {
          userName: {
            contains: params.userName,
          },
          phone: {
            contains: params.phone,
          },
          status: params.status,
        },
      },
      take: limit,
      skip: ((params.page ?? 1) - 1) * limit,
    });
  };

  // 编辑用户接口
  updateUser = async (data: Users): Promise<Users> =>
    await db.users.update({
      where: {
        userId: data.userId,
      },
      data,
    });

  // 删除用户接口
  deleteUser = async (userId: number): Promise<Users> =>
    await db.users.delete({ where: { userId } });

  // 查询单个用户接口
  getUserDetail = async (user: Partial<Users>): Promise<Users> =>
    await db.users.findUnique({ where: user as Users });
}

/**
 * 用户相关接口
 */
export const userServers = new UserServers();
