import { PrismaClient } from "@prisma/client";
import { dbLogger } from "../logs";
const prisma = new PrismaClient({
  log: [{ level: "error", emit: "event" }],
  errorFormat: "pretty",
});

prisma.$on("error", (e) => {
  dbLogger.error(e);
});

export * from "@prisma/client";
export default prisma;
