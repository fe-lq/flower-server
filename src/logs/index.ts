import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;
// 字符串格式
// const logFormat = printf(({ level, message, timestamp }) => {
//   return `[${timestamp}] ${level}: ${JSON.stringify(message)}`;
// });

export const logger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), prettyPrint()),
  transports: [
    new transports.File({
      filename: `${__dirname}/files/error.log`,
      level: "error",
    }),
    new transports.File({
      filename: `${__dirname}/files/info.log`,
      level: "info",
    }),
  ],
});

export const dbLogger = createLogger({
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), prettyPrint()),
  transports: [
    new transports.File({
      filename: `${__dirname}/files/db-error.log`,
      level: "error",
    }),
  ],
});
