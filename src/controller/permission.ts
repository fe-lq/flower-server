import type Koa from 'koa';
import { permissionServer } from '../services/permission';
import { emitError } from '../utils/error';

class PermController {
  async getPerms(ctx: Koa.Context) {
    const queryParams = ctx.request.body ?? {};
    try {
      const res = await permissionServer.getPerms(queryParams);
      ctx.body = {
        code: 0,
        data: res,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
  async addPermission(ctx: Koa.Context) {
    const params = ctx.request.body as any;
    try {
      const res = await permissionServer.addPerm(params);
      ctx.body = {
        code: 0,
        data: res,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
  async updatePermission(ctx: Koa.Context) {
    const permData = ctx.request.body as any;
    try {
      const res = await permissionServer.updatePerm(permData);
      ctx.body = {
        code: 0,
        data: res,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
  async deletePermission(ctx: Koa.Context) {
    const { id } = ctx.query as any;
    try {
      const res = await permissionServer.deletePerm(Number(id));
      ctx.body = {
        code: 0,
        data: res,
        message: 'success'
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
}

export const permController = new PermController();
