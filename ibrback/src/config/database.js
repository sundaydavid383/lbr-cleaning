// Lazily require @prisma/client so that projects running purely on
// MongoDB (no `npx prisma generate` run yet) don't crash on boot.
let prisma = null;

if ((process.env.DATABASE_PROVIDER || "mongodb").toLowerCase() === "postgres") {
  const { PrismaClient } = require("@prisma/client");
  prisma = new PrismaClient();
}

module.exports = prisma;
