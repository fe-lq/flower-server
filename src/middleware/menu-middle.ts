import Koa from 'koa';
import { menuServers } from '../services/menu';
import { BAD_REQUEST } from '../constants';
import { compact } from 'lodash';
import { emitError } from '../utils/error';

/**
 * 校验菜单提示映射关系
 */
export const MenuRules = {
  menuName: '名称',
  menuPath: '路径'
};

export const checkMenuMiddle = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    const data = ctx.request.body;
    const checkMenuList = await Promise.all(
      Object.keys(MenuRules).map((key) => menuServers.getMenuItem(data, key))
    );
    const menuItem = compact(checkMenuList);
    if (menuItem.length) {
      emitError(ctx, new Error(`菜单${MenuRules[menuItem[0].key]}已存在`), BAD_REQUEST);
    } else {
      await next();
    }
  } catch (error) {
    emitError(ctx, error);
  }
};
