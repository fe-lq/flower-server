import db, { Users } from "../db";
class UserServers {
  register = async (data: Users): Promise<Users> =>
    await db.users.create({ data });
  login = async (data: Partial<Users>): Promise<Users[]> =>
    await db.users.findMany({ where: { phone: data.phone } });
  // loginOut = async (data: Users): Promise<Users> => await db.users.create({ data });
}
export const userServers = new UserServers();
