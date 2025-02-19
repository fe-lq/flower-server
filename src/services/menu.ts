import { omit } from 'lodash';
import db, { Prisma } from '../db';
import { publicServers } from './public';
import { CreateMenuDto, UpdateMenuDto } from '../dto/menu.dto';
import { Menu } from '../types/prismaTypes';
import { MenuRules } from '../middleware';

const iconConfig = {
  gold: '金币',
  like: '点赞',
  profile: '个人中心',
  folder: '文件夹',
  database: '数据库',
  'file-search': '文件搜索',
  setting: '设置',
  shopping: '购物车',
  home: '首页'
};

class MenuServers {
  /** 获取图标列表 */
  getMenuIcons = async (): Promise<{ path: string; label: string }[]> => {
    const list = await publicServers.getOssFiles('icons');
    return list.map((file) => {
      const fileName = file.name.split('.')[0].substring('icons/'.length);
      return {
        path: file.url,
        label: iconConfig[fileName]
      };
    });
  };

  /** 新增菜单 */
  addMenu = async (data?: CreateMenuDto): Promise<CreateMenuDto> =>
    await db.menu.create({
      data
    });

  /** 删除菜单 */
  deleteMenu = async (id: number): Promise<CreateMenuDto> =>
    await db.menu.delete({ where: { id } });

  /** 修改菜单 */
  updateMenu = async (data: CreateMenuDto & { id: number }): Promise<CreateMenuDto> =>
    await db.menu.update({ where: { id: data.id }, data: omit(data, 'id') });

  /** 修改菜单顺序 */
  updateMenuSort = async (data: UpdateMenuDto[]): Promise<any> => {
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
                  level: child.level
                }
              }))
            }
          }
        })
      )
    );
    return all;
  };

  /** 查询菜单 */
  getMenuList = async (data?: CreateMenuDto): Promise<CreateMenuDto[]> =>
    await db.menu.findMany({
      where: {
        parentId: null,
        menuName: data?.menuName,
        menuPath: data?.menuPath
      },
      orderBy: {
        level: 'asc'
      },
      include: {
        children: {
          orderBy: {
            level: 'asc'
          }
        }
      }
    });

  /** 查询有权限的菜单 */
  getPermMenus = async (data?: Partial<CreateMenuDto>): Promise<CreateMenuDto[]> =>
    await db.menu.findMany({
      where: {
        OR: [
          {
            parentId: null,
            menuName: data?.menuName,
            menuPath: data?.menuPath,
            permissionId: data?.permissionId
          },
          /** 根据权限查询菜单时 */
          {
            children: {
              some: { permissionId: data?.permissionId }
            }
          }
        ]
      },
      orderBy: {
        level: 'asc'
      },
      include: {
        children: {
          orderBy: {
            level: 'asc'
          },
          where: {
            permissionId: data?.permissionId
          }
        }
      }
    });

  /** 查询单条数据校验 */
  getMenuItem = async (
    data: Partial<Menu>,
    key: keyof typeof MenuRules
  ): Promise<CreateMenuDto & { key?: string }> => {
    const res = await db.menu.findUnique({
      where: {
        [key]: data[key],
        NOT: {
          id: data.id
        }
      } as unknown as Prisma.MenuWhereUniqueInput
    });
    return res ? Object.assign(res, { key }) : res;
  };
}
export const menuServers = new MenuServers();
