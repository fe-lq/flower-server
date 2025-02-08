/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, KoaTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controller/user';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PublicController } from './../controller/public';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PermController } from './../controller/permission';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MenuController } from './../controller/menu';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GoodsTypeController } from './../controller/goods-type';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GoodsController } from './../controller/goods';
import { koaAuthentication } from './../middleware/authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Context, Next, Middleware, Request as KRequest, Response as KResponse } from 'koa';
import type * as KoaRouter from '@koa/router';
const multer = require('@koa/multer');
const koaAuthenticationRecasted = koaAuthentication as (
  req: KRequest,
  securityName: string,
  scopes?: string[],
  res?: KResponse
) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  CreateUserDto: {
    dataType: 'refObject',
    properties: {
      userName: { dataType: 'string', required: true },
      phone: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
      email: { dataType: 'string' },
      permissionId: { dataType: 'double' },
      status: { dataType: 'boolean', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  LoginRequest: {
    dataType: 'refObject',
    properties: {
      phone: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_any.string-or-number-or-any_': {
    dataType: 'refAlias',
    type: { dataType: 'nestedObjectLiteral', nestedProperties: {}, validators: {} }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateMenuDto: {
    dataType: 'refObject',
    properties: {
      icon: { dataType: 'string' },
      menuName: { dataType: 'string', required: true },
      menuPath: { dataType: 'string', required: true },
      permNode: { dataType: 'double' },
      level: { dataType: 'double', required: true },
      parentId: { dataType: 'double', required: true },
      permissionId: { dataType: 'double', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  SearchParams: {
    dataType: 'refObject',
    properties: {
      userName: { dataType: 'string', required: true },
      phone: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
      email: { dataType: 'string' },
      permissionId: { dataType: 'double' },
      status: { dataType: 'boolean', required: true },
      page: { dataType: 'double' },
      pageSize: { dataType: 'double' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Partial_CreateUserDto_: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        userName: { dataType: 'string' },
        phone: { dataType: 'string' },
        password: { dataType: 'string' },
        email: { dataType: 'string' },
        permissionId: { dataType: 'double' },
        status: { dataType: 'boolean' }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UploadResponse: {
    dataType: 'refObject',
    properties: {
      filename: { dataType: 'string', required: true },
      path: { dataType: 'string', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  PermissionDto: {
    dataType: 'refObject',
    properties: {
      userName: { dataType: 'string', required: true },
      roleName: { dataType: 'string', required: true },
      members: { dataType: 'array', array: { dataType: 'double' }, required: true },
      permissionScope: { dataType: 'array', array: { dataType: 'double' }, required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_PermissionDto.Exclude_keyofPermissionDto.userName__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        roleName: { dataType: 'string', required: true },
        members: { dataType: 'array', array: { dataType: 'double' }, required: true },
        permissionScope: { dataType: 'array', array: { dataType: 'double' }, required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_PermissionDto.userName_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_PermissionDto.Exclude_keyofPermissionDto.userName__', validators: {} }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Partial_PermissionDto_: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        userName: { dataType: 'string' },
        roleName: { dataType: 'string' },
        members: { dataType: 'array', array: { dataType: 'double' } },
        permissionScope: { dataType: 'array', array: { dataType: 'double' } }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateMenuDto: {
    dataType: 'refObject',
    properties: {
      icon: { dataType: 'string' },
      menuName: { dataType: 'string', required: true },
      menuPath: { dataType: 'string', required: true },
      permNode: { dataType: 'double' },
      level: { dataType: 'double', required: true },
      parentId: { dataType: 'double', required: true },
      permissionId: { dataType: 'double', required: true },
      id: { dataType: 'double', required: true },
      children: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'UpdateMenuDto' },
        required: true
      }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Required_Pick_GoodsTypes.typeParentId-or-typeEnable__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        typeEnable: { dataType: 'boolean', required: true },
        typeParentId: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  GoodsTypes: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        goods: { dataType: 'array', array: { dataType: 'refAlias', ref: 'Goods' }, required: true },
        children: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'GoodsTypes' },
          required: true
        },
        typeParent: { ref: 'GoodsTypes' },
        typeParentId: { dataType: 'double' },
        typeEnable: { dataType: 'boolean', required: true },
        typeImg: { dataType: 'string' },
        typeName: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Comment: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        goods: { ref: 'Goods', required: true },
        children: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'Comment' },
          required: true
        },
        parent: { ref: 'Comment' },
        authorId: { dataType: 'double', required: true },
        parentId: { dataType: 'double' },
        content: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true },
        goodsId: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Goods: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        orderGoods: { ref: 'OrderGoods' },
        cartGoods: { ref: 'CartGoods' },
        goodsComments: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'Comment' },
          required: true
        },
        goodsType: { ref: 'GoodsTypes', required: true },
        goodsUserId: { dataType: 'double', required: true },
        goodsUser: { dataType: 'string', required: true },
        goodsUpdate: { dataType: 'string' },
        goodsCreate: { dataType: 'string' },
        goodsIsDel: { dataType: 'boolean' },
        goodsSellCount: { dataType: 'double' },
        goodsDesc: { dataType: 'string' },
        goodsOnSale: { dataType: 'boolean' },
        goodsTypeId: { dataType: 'double', required: true },
        goodsImgs: { dataType: 'string', required: true },
        goodsAmount: { dataType: 'double' },
        goodsCostPrice: { dataType: 'double', required: true },
        goodsMarkPrice: { dataType: 'double', required: true },
        goodsPrice: { dataType: 'double', required: true },
        goodsName: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CartGoods: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        goods: { ref: 'Goods', required: true },
        cart: { ref: 'Cart', required: true },
        goodsIsChecked: { dataType: 'boolean', required: true },
        goodsCount: { dataType: 'double', required: true },
        goodsId: { dataType: 'double', required: true },
        cartId: { dataType: 'double', required: true },
        id: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Cart: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        cartGoods: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'CartGoods' },
          required: true
        },
        cartUserId: { dataType: 'double', required: true },
        id: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  OrderGoods: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        order: { ref: 'Orders', required: true },
        goods: { ref: 'Goods', required: true },
        goodsCount: { dataType: 'double', required: true },
        goodsId: { dataType: 'double', required: true },
        orderId: { dataType: 'double', required: true },
        id: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Orders: {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        orderGoods: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'OrderGoods' },
          required: true
        },
        orderUserId: { dataType: 'double', required: true },
        orderUpdate: { dataType: 'string' },
        orderCreate: { dataType: 'string' },
        orderStatus: { dataType: 'double', required: true },
        orderComment: { dataType: 'string', required: true },
        orderNo: { dataType: 'string', required: true },
        id: { dataType: 'double', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_GoodsTypes.Exclude_keyofGoodsTypes.id__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        typeName: { dataType: 'string', required: true },
        typeImg: { dataType: 'string' },
        typeEnable: { dataType: 'boolean', required: true },
        typeParentId: { dataType: 'double' },
        typeParent: { ref: 'GoodsTypes' },
        children: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'GoodsTypes' },
          required: true
        },
        goods: { dataType: 'array', array: { dataType: 'refAlias', ref: 'Goods' }, required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_GoodsTypes.id_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_GoodsTypes.Exclude_keyofGoodsTypes.id__', validators: {} }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Required_Pick_Goods.goodsName-or-goodsOnSale__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        goodsName: { dataType: 'string', required: true },
        goodsOnSale: { dataType: 'boolean', required: true }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Pick_Goods.Exclude_keyofGoods.id__': {
    dataType: 'refAlias',
    type: {
      dataType: 'nestedObjectLiteral',
      nestedProperties: {
        goodsName: { dataType: 'string', required: true },
        goodsOnSale: { dataType: 'boolean' },
        goodsPrice: { dataType: 'double', required: true },
        goodsMarkPrice: { dataType: 'double', required: true },
        goodsCostPrice: { dataType: 'double', required: true },
        goodsAmount: { dataType: 'double' },
        goodsImgs: { dataType: 'string', required: true },
        goodsTypeId: { dataType: 'double', required: true },
        goodsDesc: { dataType: 'string' },
        goodsSellCount: { dataType: 'double' },
        goodsIsDel: { dataType: 'boolean' },
        goodsCreate: { dataType: 'string' },
        goodsUpdate: { dataType: 'string' },
        goodsUser: { dataType: 'string', required: true },
        goodsUserId: { dataType: 'double', required: true },
        goodsType: { ref: 'GoodsTypes', required: true },
        goodsComments: {
          dataType: 'array',
          array: { dataType: 'refAlias', ref: 'Comment' },
          required: true
        },
        cartGoods: { ref: 'CartGoods' },
        orderGoods: { ref: 'OrderGoods' }
      },
      validators: {}
    }
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'Omit_Goods.id_': {
    dataType: 'refAlias',
    type: { ref: 'Pick_Goods.Exclude_keyofGoods.id__', validators: {} }
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new KoaTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter, opts?: { multer?: ReturnType<typeof multer> }) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const upload = opts?.multer || multer({ limits: { fileSize: 8388608 } });

  const argsUserController_register: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: { in: 'body', name: 'requestParams', required: true, ref: 'CreateUserDto' }
  };
  router.post(
    '/users/register',
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.register),

    async function UserController_register(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_register,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'register',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_login: Record<string, TsoaRoute.ParameterSchema> = {
    params: { in: 'body', name: 'params', required: true, ref: 'LoginRequest' }
  };
  router.post(
    '/users/login',
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.login),

    async function UserController_login(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_login,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'login',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_loginOut: Record<string, TsoaRoute.ParameterSchema> = {
    token: { in: 'header', name: 'authorization', required: true, dataType: 'string' }
  };
  router.get(
    '/users/logout',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.loginOut),

    async function UserController_loginOut(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_loginOut,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'loginOut',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_getUserInfo: Record<string, TsoaRoute.ParameterSchema> = {
    token: { in: 'header', name: 'authorization', required: true, dataType: 'string' }
  };
  router.get(
    '/users/info',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.getUserInfo),

    async function UserController_getUserInfo(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_getUserInfo,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'getUserInfo',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_getUserList: Record<string, TsoaRoute.ParameterSchema> = {
    searchParams: { in: 'body', name: 'searchParams', required: true, ref: 'SearchParams' }
  };
  router.post(
    '/users/list',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.getUserList),

    async function UserController_getUserList(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_getUserList,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'getUserList',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_deleteUser: Record<string, TsoaRoute.ParameterSchema> = {
    userId: { in: 'query', name: 'userId', required: true, dataType: 'string' }
  };
  router.get(
    '/users/delete',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.deleteUser),

    async function UserController_deleteUser(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_deleteUser,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'deleteUser',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: {
      in: 'body',
      name: 'requestParams',
      required: true,
      dataType: 'intersection',
      subSchemas: [
        { ref: 'Partial_CreateUserDto_' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { userId: { dataType: 'double', required: true } }
        }
      ]
    }
  };
  router.post(
    '/users/update',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.updateUser),

    async function UserController_updateUser(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_updateUser,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'updateUser',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUserController_getUserDetail: Record<string, TsoaRoute.ParameterSchema> = {
    userId: { in: 'query', name: 'userId', required: true, dataType: 'double' }
  };
  router.get(
    '/users/read',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(UserController),
    ...fetchMiddlewares<Middleware>(UserController.prototype.getUserDetail),

    async function UserController_getUserDetail(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUserController_getUserDetail,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new UserController();

      return templateService.apiHandler({
        methodName: 'getUserDetail',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsPublicController_uploadFile: Record<string, TsoaRoute.ParameterSchema> = {
    files: { in: 'formData', name: 'files', required: true, dataType: 'file' }
  };
  router.post(
    '/public/uploadFile',
    authenticateMiddleware([{ jwt: [] }]),
    upload.fields([
      {
        name: 'files',
        maxCount: 1
      }
    ]),
    ...fetchMiddlewares<Middleware>(PublicController),
    ...fetchMiddlewares<Middleware>(PublicController.prototype.uploadFile),

    async function PublicController_uploadFile(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsPublicController_uploadFile,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new PublicController();

      return templateService.apiHandler({
        methodName: 'uploadFile',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsPublicController_deleteFile: Record<string, TsoaRoute.ParameterSchema> = {
    body: {
      in: 'body',
      name: 'body',
      required: true,
      dataType: 'nestedObjectLiteral',
      nestedProperties: { filePath: { dataType: 'string', required: true } }
    }
  };
  router.delete(
    '/public/deleteFile',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(PublicController),
    ...fetchMiddlewares<Middleware>(PublicController.prototype.deleteFile),

    async function PublicController_deleteFile(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsPublicController_deleteFile,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new PublicController();

      return templateService.apiHandler({
        methodName: 'deleteFile',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsPermController_getPermissions: Record<string, TsoaRoute.ParameterSchema> = {
    queryParams: { in: 'body', name: 'queryParams', required: true, ref: 'PermissionDto' }
  };
  router.post(
    '/permission/list',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(PermController),
    ...fetchMiddlewares<Middleware>(PermController.prototype.getPermissions),

    async function PermController_getPermissions(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsPermController_getPermissions,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new PermController();

      return templateService.apiHandler({
        methodName: 'getPermissions',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsPermController_addPermission: Record<string, TsoaRoute.ParameterSchema> = {
    params: { in: 'body', name: 'params', required: true, ref: 'Omit_PermissionDto.userName_' }
  };
  router.post(
    '/permission/add',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(PermController),
    ...fetchMiddlewares<Middleware>(PermController.prototype.addPermission),

    async function PermController_addPermission(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsPermController_addPermission,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new PermController();

      return templateService.apiHandler({
        methodName: 'addPermission',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsPermController_updatePermission: Record<string, TsoaRoute.ParameterSchema> = {
    permData: {
      in: 'body',
      name: 'permData',
      required: true,
      dataType: 'intersection',
      subSchemas: [
        { ref: 'Partial_PermissionDto_' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { id: { dataType: 'double', required: true } }
        }
      ]
    }
  };
  router.post(
    '/permission/update',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(PermController),
    ...fetchMiddlewares<Middleware>(PermController.prototype.updatePermission),

    async function PermController_updatePermission(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsPermController_updatePermission,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new PermController();

      return templateService.apiHandler({
        methodName: 'updatePermission',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsPermController_deletePermission: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' }
  };
  router.get(
    '/permission/delete',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(PermController),
    ...fetchMiddlewares<Middleware>(PermController.prototype.deletePermission),

    async function PermController_deletePermission(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsPermController_deletePermission,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new PermController();

      return templateService.apiHandler({
        methodName: 'deletePermission',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_getIcons: Record<string, TsoaRoute.ParameterSchema> = {};
  router.get(
    '/menu/icons',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.getIcons),

    async function MenuController_getIcons(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_getIcons,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'getIcons',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_uploadIcon: Record<string, TsoaRoute.ParameterSchema> = {
    file: { in: 'formData', name: 'file', required: true, dataType: 'file' }
  };
  router.post(
    '/menu/icon/upload',
    authenticateMiddleware([{ jwt: [] }]),
    upload.fields([
      {
        name: 'file',
        maxCount: 1
      }
    ]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.uploadIcon),

    async function MenuController_uploadIcon(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_uploadIcon,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'uploadIcon',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_deleteIcon: Record<string, TsoaRoute.ParameterSchema> = {
    body: {
      in: 'body',
      name: 'body',
      required: true,
      dataType: 'nestedObjectLiteral',
      nestedProperties: { filePath: { dataType: 'string', required: true } }
    }
  };
  router.post(
    '/menu/icon/delete',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.deleteIcon),

    async function MenuController_deleteIcon(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_deleteIcon,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'deleteIcon',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_addMenuItem: Record<string, TsoaRoute.ParameterSchema> = {
    data: { in: 'body', name: 'data', required: true, ref: 'CreateMenuDto' }
  };
  router.post(
    '/menu/add',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.addMenuItem),

    async function MenuController_addMenuItem(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_addMenuItem,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'addMenuItem',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_getMenuList: Record<string, TsoaRoute.ParameterSchema> = {
    data: { in: 'body', name: 'data', required: true, ref: 'CreateMenuDto' }
  };
  router.post(
    '/menu/list',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.getMenuList),

    async function MenuController_getMenuList(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_getMenuList,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'getMenuList',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_updateMenuItem: Record<string, TsoaRoute.ParameterSchema> = {
    data: {
      in: 'body',
      name: 'data',
      required: true,
      dataType: 'intersection',
      subSchemas: [
        { ref: 'CreateMenuDto' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: { id: { dataType: 'double', required: true } }
        }
      ]
    }
  };
  router.post(
    '/menu/update',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.updateMenuItem),

    async function MenuController_updateMenuItem(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_updateMenuItem,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'updateMenuItem',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_updateMenuSort: Record<string, TsoaRoute.ParameterSchema> = {
    data: {
      in: 'body',
      name: 'data',
      required: true,
      dataType: 'array',
      array: { dataType: 'refObject', ref: 'UpdateMenuDto' }
    }
  };
  router.post(
    '/menu/updateSort',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.updateMenuSort),

    async function MenuController_updateMenuSort(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_updateMenuSort,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'updateMenuSort',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsMenuController_deleteMenuItem: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' }
  };
  router.get(
    '/menu/delete',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(MenuController),
    ...fetchMiddlewares<Middleware>(MenuController.prototype.deleteMenuItem),

    async function MenuController_deleteMenuItem(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsMenuController_deleteMenuItem,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new MenuController();

      return templateService.apiHandler({
        methodName: 'deleteMenuItem',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsTypeController_getTypeList: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: {
      in: 'body',
      name: 'requestParams',
      required: true,
      ref: 'Required_Pick_GoodsTypes.typeParentId-or-typeEnable__'
    }
  };
  router.post(
    '/goods-type/list',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsTypeController),
    ...fetchMiddlewares<Middleware>(GoodsTypeController.prototype.getTypeList),

    async function GoodsTypeController_getTypeList(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsTypeController_getTypeList,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsTypeController();

      return templateService.apiHandler({
        methodName: 'getTypeList',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsTypeController_addType: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: { in: 'body', name: 'requestParams', required: true, ref: 'Omit_GoodsTypes.id_' }
  };
  router.post(
    '/goods-type/add',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsTypeController),
    ...fetchMiddlewares<Middleware>(GoodsTypeController.prototype.addType),

    async function GoodsTypeController_addType(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsTypeController_addType,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsTypeController();

      return templateService.apiHandler({
        methodName: 'addType',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsTypeController_updateType: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: { in: 'body', name: 'requestParams', required: true, ref: 'GoodsTypes' }
  };
  router.post(
    '/goods-type/update',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsTypeController),
    ...fetchMiddlewares<Middleware>(GoodsTypeController.prototype.updateType),

    async function GoodsTypeController_updateType(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsTypeController_updateType,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsTypeController();

      return templateService.apiHandler({
        methodName: 'updateType',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsTypeController_deleteType: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' }
  };
  router.get(
    '/goods-type/delete',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsTypeController),
    ...fetchMiddlewares<Middleware>(GoodsTypeController.prototype.deleteType),

    async function GoodsTypeController_deleteType(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsTypeController_deleteType,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsTypeController();

      return templateService.apiHandler({
        methodName: 'deleteType',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsController_getGoods: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: {
      in: 'body',
      name: 'requestParams',
      required: true,
      ref: 'Required_Pick_Goods.goodsName-or-goodsOnSale__'
    }
  };
  router.post(
    '/goods/getList',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsController),
    ...fetchMiddlewares<Middleware>(GoodsController.prototype.getGoods),

    async function GoodsController_getGoods(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsController_getGoods,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsController();

      return templateService.apiHandler({
        methodName: 'getGoods',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsController_createGoods: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: {
      in: 'body',
      name: 'requestParams',
      required: true,
      dataType: 'intersection',
      subSchemas: [
        { ref: 'Omit_Goods.id_' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            goodsImgs: { dataType: 'array', array: { dataType: 'string' }, required: true }
          }
        }
      ]
    }
  };
  router.post(
    '/goods/create',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsController),
    ...fetchMiddlewares<Middleware>(GoodsController.prototype.createGoods),

    async function GoodsController_createGoods(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsController_createGoods,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsController();

      return templateService.apiHandler({
        methodName: 'createGoods',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsController_updateGoods: Record<string, TsoaRoute.ParameterSchema> = {
    requestParams: {
      in: 'body',
      name: 'requestParams',
      required: true,
      dataType: 'intersection',
      subSchemas: [
        { ref: 'Goods' },
        {
          dataType: 'nestedObjectLiteral',
          nestedProperties: {
            goodsImgs: { dataType: 'array', array: { dataType: 'string' }, required: true }
          }
        }
      ]
    }
  };
  router.post(
    '/goods/update',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsController),
    ...fetchMiddlewares<Middleware>(GoodsController.prototype.updateGoods),

    async function GoodsController_updateGoods(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsController_updateGoods,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsController();

      return templateService.apiHandler({
        methodName: 'updateGoods',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGoodsController_deleteGoods: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' }
  };
  router.get(
    '/goods/delete',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<Middleware>(GoodsController),
    ...fetchMiddlewares<Middleware>(GoodsController.prototype.deleteGoods),

    async function GoodsController_deleteGoods(context: Context, next: Next) {
      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGoodsController_deleteGoods,
          context,
          next
        });
      } catch (err) {
        const error = err as any;
        error.message ||= JSON.stringify({ fields: error.fields });
        context.status = error.status;
        context.throw(context.status, error.message, error);
      }

      const controller = new GoodsController();

      return templateService.apiHandler({
        methodName: 'deleteGoods',
        controller,
        context,
        validatedArgs,
        successStatus: undefined
      });
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(context: any, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              koaAuthenticationRecasted(
                context.request,
                name,
                secMethod[name],
                context.response
              ).catch(pushAndRethrow)
            );
          }

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              koaAuthenticationRecasted(
                context.request,
                name,
                secMethod[name],
                context.response
              ).catch(pushAndRethrow)
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let success;
      try {
        const user = await Promise.any(secMethodOrPromises);
        success = true;
        context.request['user'] = user;
      } catch (err) {
        // Response was sent in middleware, abort
        if (context.response.body) {
          return;
        }

        // Show most recent error as response
        const error = failedAttempts.pop();
        context.status = error.status || 401;
        context.throw(context.status, error.message, error);
      }

      // Response was sent in middleware, abort
      if (context.response.body) {
        return;
      }

      if (success) {
        await next();
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
