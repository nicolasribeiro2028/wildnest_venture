/**
 * Seeds the database with a master user when MASTER_EMAIL / MASTER_PASSWORD are set.
 * Run with: npx prisma db seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const MASTER_EMAIL = process.env.MASTER_EMAIL ?? "master@wildnest.local";
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

  // Sample listing for map testing (step 4)
  await prisma.listing.upsert({
    where: { id: "seed-listing-1" },
    update: {},
    create: {
      id: "seed-listing-1",
      userId: user.id,
      tag: "sublet",
      term: "summer",
      title: "Cozy room near campus",
      description: "Quiet room with shared kitchen. Available June–August.",
      price: "850",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      pinX: 50,
      pinY: 45,
    },
  });
  console.log("Sample listing ready for map");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
