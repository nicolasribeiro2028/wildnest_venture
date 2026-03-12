"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { getCurrentUserId } from "@/app/lib/auth";
import {
  saveListingImages,
  parseImageUrls,
  stringifyImageUrls,
} from "@/app/lib/upload";

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
  imageUrls?: string[];
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
    include: { user: { select: { firstName: true, lastName: true } } },
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
    include: { user: { select: { firstName: true, lastName: true, id: true } } },
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

function extractFormData(formData: FormData): ListingFormData & { returnTo?: string } {
  const pinXVal = parseFloat(formData.get("pinX") as string) || 50;
  const pinYVal = parseFloat(formData.get("pinY") as string) || 45;
  return {
    tag: (formData.get("tag") as "sublet" | "landlord") || "sublet",
    term: (formData.get("term") as "summer" | "year_long") || "summer",
    title: (formData.get("title") as string)?.trim() || "",
    description: (formData.get("description") as string)?.trim() || undefined,
    price: (formData.get("price") as string)?.trim() || undefined,
    startDate: (formData.get("startDate") as string)?.trim() || undefined,
    endDate: (formData.get("endDate") as string)?.trim() || undefined,
    pinX: pinXVal,
    pinY: pinYVal,
    returnTo: (formData.get("returnTo") as string) || undefined,
  };
}

export async function createListingAction(formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const data = extractFormData(formData);
  const files = (formData.getAll("images") as File[]).filter(
    (f): f is File => f instanceof File && f.size > 0
  );

  if (!data.title?.trim()) {
    return { error: "Title is required." };
  }

  const listing = await prisma.listing.create({
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

  let imageUrls: string[] = [];
  if (files.length > 0) {
    imageUrls = await saveListingImages(files, listing.id);
    if (imageUrls.length > 0) {
      await prisma.listing.update({
        where: { id: listing.id },
        data: { imageUrls: stringifyImageUrls(imageUrls) },
      });
    }
  }

  revalidatePath("/search");
  revalidatePath("/listings");
  revalidatePath("/my-sublets");
  redirect(data.returnTo === "my-sublets" ? "/my-sublets" : "/listings");
}

export async function updateListingAction(listingId: string, formData: FormData) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const existing = await prisma.listing.findUnique({ where: { id: listingId } });
  if (!existing || existing.userId !== userId) {
    return { error: "Listing not found or you cannot edit it." };
  }

  const data = extractFormData(formData);
  if (!data.title?.trim()) {
    return { error: "Title is required." };
  }

  const files = (formData.getAll("images") as File[]).filter(
    (f): f is File => f instanceof File && f.size > 0
  );

  let imageUrls = parseImageUrls(existing.imageUrls);
  if (files.length > 0) {
    const newUrls = await saveListingImages(files, listingId);
    imageUrls = [...imageUrls, ...newUrls].slice(0, 5);
  }

  await prisma.listing.update({
    where: { id: listingId },
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
      imageUrls: stringifyImageUrls(imageUrls),
    },
  });

  revalidatePath("/search");
  revalidatePath("/listings");
  revalidatePath("/my-sublets");
  revalidatePath(`/listings/${listingId}`);
  redirect(`/listings/${listingId}`);
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
