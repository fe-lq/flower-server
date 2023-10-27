import db, { users } from "../db";

class UserServers {
  register = async (data: users) => await db.users.create({ data });
}
export const userServers = new UserServers();
