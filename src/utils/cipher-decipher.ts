import { Buffer } from "buffer";
import { createCipheriv, createDecipheriv } from "crypto";

// 生成16位字节
const secret = Buffer.from("Password").toString("hex");
const ivKey = Buffer.alloc(16);

class CipherDecipher {
  // 转换成哈希密码
  encryptionPwd(pwd: string) {
    const cipher = createCipheriv("aes-128-cbc", secret, ivKey);
    let pwdHex = cipher.update(pwd, "utf8", "hex");

    pwdHex += cipher.final("hex");
    return pwdHex;
  }

  // 转换成密码
  decryptionPwd = (pwdHex: string) => {
    const decipher = createDecipheriv("aes-128-cbc", secret, ivKey);
    let receivedText = decipher.update(pwdHex, "hex", "utf8");
    receivedText += decipher.final("utf8");

    return receivedText;
  };
}
export const cipherDecipher = new CipherDecipher();
