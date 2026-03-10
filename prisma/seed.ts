/**
 * Seeds the database with a master user when MASTER_EMAIL / MASTER_PASSWORD are set.
 * Run with: npx prisma db seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const MASTER_EMAIL = process.env.MASTER_EMAIL ?? "master@aparturtle.local";
const MASTER_PASSWORD = process.env.MASTER_PASSWORD ?? "master-change-me";

async function main() {
  const passwordHash = await bcrypt.hash(MASTER_PASSWORD, 10);
  const user = await prisma.user.upsert({
    where: { email: MASTER_EMAIL },
    update: { passwordHash },
    create: {
      email: MASTER_EMAIL,
      name: "Master",
      passwordHash,
    },
  });
  console.log("Master user ready:", user.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
