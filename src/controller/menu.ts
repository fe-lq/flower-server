import type Koa from "koa";
import fs from "fs";
import { menuServers } from "../services/menu";
import { emitError } from "../utils/error";
import { BAD_REQUEST } from "../constants";

class MenuController {
  // 获取图标
  async getIcons(ctx: Koa.Context) {
    try {
      const res = await menuServers.getMenuIcons();
      ctx.body = {
        code: 0,
        data: res,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  // 上传图标
  async uploadIcon(ctx: Koa.Context) {
    try {
      const file = ctx.request.files.file as unknown as Koa.Request["files"];
      ctx.body = {
        code: 0,
        data: {
          ...file,
          path: `http://127.0.0.1:5500/public/icons/${file.newFilename}`,
        },
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error, BAD_REQUEST);
    }
  }

  // 删除图标
  async deleteIcon(ctx: Koa.Context) {
    try {
      /**
       * 当静态文件夹部署在服务器是用filepath
       *
       * 本地测试先用newFilename
       * 所以先拼接/Users/lq/Desktop/lq_project/flower-server/public/icons
       */
      // /Users/lq/Desktop/lq_project/flower-server/public/icons
      const path = ctx.request.body.filePath;
      const fileName = path.split("/").pop();
      fs.unlinkSync(
        `/Users/lq/Desktop/lq_project/flower-server/public/icons/${fileName}`
      );
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  // 添加菜单项
  async addMenuItem(ctx: Koa.Context) {
    try {
      const data = ctx.request.body;
      await menuServers.addMenu(data);
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  // 获取菜单列表
  async getMenuList(ctx: Koa.Context) {
    try {
      const data = ctx.request.body;
      const res = await menuServers.getMenuList(data);
      ctx.body = {
        code: 0,
        data: res,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  // 更新菜单项
  async updateMenuItem(ctx: Koa.Context) {
    try {
      const data = ctx.request.body;
      await menuServers.updateMenu(data);
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  // 更新菜单顺序
  async updateMenuSort(ctx: Koa.Context) {
    try {
      const data = ctx.request.body;
      await menuServers.updateMenuSort(data);
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }

  // 删除菜单项
  async deleteMenuItem(ctx: Koa.Context) {
    try {
      const data = ctx.request.query;
      await menuServers.deleteMenu(Number(data.id));
      ctx.body = {
        code: 0,
        message: "success",
      };
      ctx.status = 200;
    } catch (error) {
      emitError(ctx, error);
    }
  }
}

export const menuController = new MenuController();
