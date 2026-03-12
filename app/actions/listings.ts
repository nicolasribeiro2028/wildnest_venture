"use server";

import { prisma } from "@/app/lib/db";

export async function getListingsForMap() {
  const listings = await prisma.listing.findMany({
    select: { id: true, pinX: true, pinY: true, title: true },
    orderBy: { createdAt: "desc" },
  });
  return listings;
}
