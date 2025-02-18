import Koa from 'koa';
import { menuServers } from '../services/menu';
import { compact } from 'lodash';

/**
 * 校验菜单提示映射关系
 */
export const MenuRules = {
  menuName: '名称',
  menuPath: '路径'
};

/**
 * 校验菜单提示映射关系
 * @param ctx
 * @param next
 */
export const checkMenuMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  const data = ctx.request.body;
  const checkMenuList = await Promise.all(
    Object.keys(MenuRules).map((key) =>
      menuServers.getMenuItem(data, key as keyof typeof MenuRules)
    )
  );
  const menuItem = compact(checkMenuList);
  if (menuItem.length) {
    throw new Error(`菜单${MenuRules[menuItem[0].key]}已存在`);
  } else {
    await next();
  }
};
