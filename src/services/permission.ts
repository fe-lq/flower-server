import db, { Permission } from "../db";

class PermissionServer {
  // 查询权限接口
  getPerms = async (params: {
    roleName?: string;
    userName?: string;
  }): Promise<Permission[]> => {
    const searchParams = {
      roleName: params.roleName ? { contains: params.roleName } : undefined,
      members: params.userName
        ? { some: { userName: { contains: params.userName } } }
        : undefined,
    };
    return await db.permission.findMany({
      where: searchParams,
      include: {
        members: { select: { userId: true, userName: true } },
        permissionScope: {
          select: { menuName: true, id: true, parentId: true },
        },
      },
    });
  };

  // 新增权限接口
  addPerm = async (perm: any): Promise<Permission> => {
    const { roleName, members, permissionScope } = perm;
    return await db.permission.create({
      data: {
        roleName,
        members: {
          connect: members.map((id: number) => ({ userId: id })),
        },
        permissionScope: {
          connect: permissionScope.map((id: number) => ({ id })),
        },
      },
    });
  };

  // 删除权限接口
  deletePerm = async (id: number) => {
    return await db.permission.delete({ where: { id } });
  };

  // 更新权限接口
  updatePerm = async (
    perm: Permission & { members: number[]; permissionScope: number[] }
  ): Promise<Permission> => {
    let userList = [];
    const { roleName, members, permissionScope } = perm;
    // 如果没有传members，就把之前存在的members取消连接
    if (!perm.members?.length) {
      const permItem = await db.permission.findUnique({
        where: { id: perm.id },
        include: { members: { select: { userId: true } } },
      });
      userList = permItem.members;
    }
    return await db.permission.update({
      where: { id: perm.id },
      include: { members: { select: { userId: true, userName: true } } },
      data: {
        roleName: roleName,
        members: {
          disconnect: userList.length ? userList : [],
          connect: members.map((id) => ({ userId: id })),
        },
        permissionScope: {
          connect: permissionScope.map((id: number) => ({ id })),
        },
      },
    });
  };
}

export const permissionServer = new PermissionServer();
