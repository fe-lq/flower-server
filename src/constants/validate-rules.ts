/**
 * 请求校验规则
 */
import { Users } from "@prisma/client";
import Joi from "joi";

export const addUserSchema = Joi.object<any, false, Users>({
  userName: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});
