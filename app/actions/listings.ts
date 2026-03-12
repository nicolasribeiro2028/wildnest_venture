"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { getCurrentUserId } from "@/app/lib/auth";

export type ListingFormData = {
  tag: "sublet" | "landlord";
  term: "summer" | "year_long";
  title: string;
  description?: string;
  price?: string;
  startDate?: string;
  endDate?: string;
  pinX: number;
  pinY: number;
};

export async function getListingsForMap() {
  const listings = await prisma.listing.findMany({
    select: { id: true, pinX: true, pinY: true, title: true },
    orderBy: { createdAt: "desc" },
  });
  return listings;
}

export async function getListings(filters: {
  tag?: "sublet" | "landlord";
  term?: "summer" | "year_long";
  sort?: "date" | "price";
} = {}) {
  const where: { tag?: string; term?: string } = {};
  if (filters.tag) where.tag = filters.tag;
  if (filters.term) where.term = filters.term;

  const listings = await prisma.listing.findMany({
    where,
    include: { user: { select: { name: true } } },
    orderBy:
      filters.sort === "price"
        ? [{ price: "asc" }, { createdAt: "desc" }]
        : { createdAt: "desc" },
  });
  return listings;
}

export async function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    include: { user: { select: { name: true, id: true } } },
  });
}

export async function getMySublets() {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  return prisma.listing.findMany({
    where: { userId, tag: "sublet" },
    orderBy: { createdAt: "desc" },
  });
}

export async function createListingAction(
  data: ListingFormData & { returnTo?: string }
) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  if (!data.title?.trim()) {
    return { error: "Title is required." };
  }

  await prisma.listing.create({
    data: {
      userId,
      tag: data.tag,
      term: data.term,
      title: data.title.trim(),
      description: data.description?.trim() || null,
      price: data.price?.trim() || null,
      startDate: data.startDate?.trim() || null,
      endDate: data.endDate?.trim() || null,
      pinX: data.pinX,
      pinY: data.pinY,
    },
  });

  revalidatePath("/search");
  revalidatePath("/listings");
  revalidatePath("/my-sublets");
  redirect(data.returnTo === "my-sublets" ? "/my-sublets" : "/listings");
}

export async function updateListingAction(id: string, data: ListingFormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const existing = await prisma.listing.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return { error: "Listing not found or you cannot edit it." };
  }

  if (!data.title?.trim()) {
    return { error: "Title is required." };
  }

  await prisma.listing.update({
    where: { id },
    data: {
      tag: data.tag,
      term: data.term,
      title: data.title.trim(),
      description: data.description?.trim() || null,
      price: data.price?.trim() || null,
      startDate: data.startDate?.trim() || null,
      endDate: data.endDate?.trim() || null,
      pinX: data.pinX,
      pinY: data.pinY,
    },
  });

  revalidatePath("/search");
  revalidatePath("/listings");
  revalidatePath("/my-sublets");
  revalidatePath(`/listings/${id}`);
  redirect(`/listings/${id}`);
}

export async function deleteListingAction(id: string) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const existing = await prisma.listing.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) {
    return { error: "Listing not found or you cannot delete it." };
  }

  await prisma.listing.delete({ where: { id } });

  revalidatePath("/search");
  revalidatePath("/listings");
  revalidatePath("/my-sublets");
  redirect(existing.tag === "sublet" ? "/my-sublets" : "/listings");
}
