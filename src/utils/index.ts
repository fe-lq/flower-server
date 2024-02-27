import Crypto from "crypto-js";
import { cipherDecipher } from "./cipher-decipher";
import { PASSWORD_SECRET_KEY } from "../constants";
import path from "path";

/**
 *
 * @param password 前端传的密码
 * @returns 数据库中存储的密码
 */
export const getPasswordHash = (password: string) => {
  // 解密前端传输的密码
  const bytes = Crypto.AES.decrypt(password, PASSWORD_SECRET_KEY);
  //加密存储到数据库中的密码
  const pwdHex = cipherDecipher.encryptionPwd(bytes.toString(Crypto.enc.Utf8));
  return pwdHex;
};

/**
 *
 * @param password 数据库中存储的密码
 * @returns 前端显示的密码
 */
export const genEncryptPsw = (password: string) => {
  //解密存储到数据库中的密码
  const pwdHex = cipherDecipher.decryptionPwd(password);
  //加密显示给前端
  const bytes = Crypto.AES.encrypt(pwdHex, PASSWORD_SECRET_KEY).toString();

  return bytes;
};

export const getCurrentPath = (dir?: string) =>
  path.join(__dirname, `../../public/${dir}`);
