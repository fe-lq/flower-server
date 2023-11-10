import db, { Users } from "../db";
class GoodsServers {
  getUsers = async (userName: string): Promise<Users[]> =>
    db.users.findMany({
      // where: { userName },
      // select: { phone: true },
      take: 2,
    });
}
export const goodsServers = new GoodsServers();
