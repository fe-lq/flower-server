/** 请求参数错误 */
export const BAD_REQUEST = 400;
/** 客户端认证失效 */
export const UNAUTHORIZED = 401;
/** 客户端没有权限 */
export const FORBIDDEN = 403;
/** 没有请求路径 */
export const NOT_FOUND = 404;
/** 服务端错误 */
export const INTERNAL_SERVER_ERROR = 500;

export const ERROR_CODE_MAP = {
  [BAD_REQUEST]: "请求参数错误",
  [UNAUTHORIZED]: "Token认证失效",
  [FORBIDDEN]: "客户端没有权限",
  [NOT_FOUND]: "没有请求路径",
  [INTERNAL_SERVER_ERROR]: "服务端错误",
};

export const JWT_SECRET_KEY = "JWT_TOKEN";

/** 对称加密key, 要与前端使用的相同 */
export const PASSWORD_SECRET_KEY = "PASSWORD";

/**
 * token有效期
 */
export const TOKEN_EXPIRED_TIME = 60 * 60 * 24; // 1天;
/**
 * token刷新时间范围
 */
export const TOKEN_REFRESH_TIME = 60 * 2;

export const JWT_WHITE_LIST = [/^\/users\/login/, /^\/users\/register/];
