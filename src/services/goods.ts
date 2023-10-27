import db from "../db";

class GoodsServers {
  getUsers = async (username: string) =>
    db.users.findMany({ where: { user_name: username } });
}
export const goodsServers = new GoodsServers();
