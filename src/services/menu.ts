import fs from "fs";
import path from "path";
import db, { Menu } from "../db";

const iconConfig = {
  gold: "金币",
  like: "点赞",
  profile: "个人中心",
  folder: "文件夹",
  database: "数据库",
  "file-search": "文件搜索",
  setting: "设置",
  shopping: "购物车",
  home: "首页",
};

class MenuServers {
  /** 获取图标列表 */
  getMenuIcons = async (): Promise<
    { path: string; label: string }[] | Error
  > => {
    try {
      const files = fs.readdirSync(
        path.join(__dirname) + "/../../public/icons/list"
      );
      return files.map((file) => ({
        path: `http://127.0.0.1:5500/public/icons/list/${file}`,
        label: iconConfig[file.split(".")[0]],
      }));
    } catch (err) {
      return new Error("读取图标失败");
    }
  };

  /** 新增菜单 */
  addMenu = async (data?: Menu): Promise<Menu> =>
    await db.menu.create({
      data,
    });

  /** 删除菜单 */
  deleteMenu = async (id: number): Promise<Menu> =>
    await db.menu.delete({ where: { id } });

  /** 修改菜单 */
  updateMenu = async (data: Menu): Promise<Menu> =>
    await db.menu.update({ where: { id: data.id }, data });

  /** 修改菜单顺序 */
  updateMenuSort = async (
    data: (Menu & { children: Menu[] })[]
  ): Promise<any> => {
    const all = await Promise.all(
      data.map((item) =>
        db.menu.update({
          where: { id: item.id },
          data: {
            level: item.level,
            children: {
              update: item.children.map((child) => ({
                where: { id: child.id },
                data: {
                  level: child.level,
                },
              })),
            },
          },
        })
      )
    );
    return all;
  };

  /** 查询菜单 */
  getMenuList = async (data?: Menu): Promise<Menu[]> =>
    await db.menu.findMany({
      where: {
        parentId: null,
        menuName: data?.menuName,
        menuPath: data?.menuPath,
      },
      orderBy: {
        level: "asc",
      },
      include: {
        children: {
          orderBy: {
            level: "asc",
          },
        },
      },
    });

  /** 查询单条数据校验 */
  getMenuItem = async (
    data: Menu,
    key: string
  ): Promise<Menu & { key?: string }> => {
    const res = await db.menu.findUnique({
      where: {
        [key]: data[key],
      } as Menu,
    });
    return res ? Object.assign(res, { key }) : res;
  };
}
export const menuServers = new MenuServers();