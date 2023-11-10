import { Buffer } from "buffer";
import { createCipheriv, createDecipheriv } from "crypto";

// 生成16位字节
const secret = Buffer.from("Password").toString("hex");
const ivKey = Buffer.alloc(10);

class CipherDecipher {
  // 转换成哈希密码
  encryptionPwd = (pwd: string) => {
    const cipher = createCipheriv("aes-128-ccm", secret, ivKey, {
      authTagLength: 16,
    });

    const pwdHex = cipher.update(pwd, "utf8").toString("hex");
    cipher.final();
    const tag = cipher.getAuthTag();
    return { pwdHex, tag };
  };

  // 转换成哈希密码
  decryptionPwd = (pwdHex: string, tag: Buffer) => {
    const decipher = createDecipheriv("aes-128-ccm", secret, ivKey, {
      authTagLength: 16,
    });
    decipher.setAuthTag(tag);
    const receivedText = decipher.update(pwdHex, "hex", "utf8");
    decipher.final();

    return receivedText;
  };
}
export const cipherDecipher = new CipherDecipher();
