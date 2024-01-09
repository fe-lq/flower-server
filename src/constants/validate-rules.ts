/**
 * 请求校验规则
 */
import { Users, Menu } from "@prisma/client";
import Joi from "joi";

/** 校验用户信息 */
export const addUserSchema = Joi.object<Users>().keys({
  userName: Joi.string().required().error(new Error("用户名不能为空")),
  phone: Joi.string().required().error(new Error("手机号不能为空")),
  password: Joi.string().required().error(new Error("密码不能为空")),
});

/** 校验菜单信息 */
export const addMenuSchema = Joi.object<Menu>({
  menuName: Joi.string().required().error(new Error("菜单名称不能为空")),
  menuPath: Joi.string().required().error(new Error("菜单地址不能为空")),
});
