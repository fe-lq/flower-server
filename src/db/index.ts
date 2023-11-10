import { PrismaClient } from "@prisma/client";
import { dbLogger } from "../logs";
const prisma = new PrismaClient({
  log: [{ level: "error", emit: "event" }],
  errorFormat: "pretty",
});

// 注册全局的监听日志
prisma.$on("error", (e) => {
  dbLogger.error(e);
});

export * from "@prisma/client";
export default prisma;
