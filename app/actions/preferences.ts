"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { getCurrentUserId } from "@/app/lib/auth";

export type PreferencesResult = { error?: string; success?: boolean };

function parseBool(val: string): boolean | null {
  if (val === "yes") return true;
  if (val === "no") return false;
  return null;
}

export async function savePreferencesAction(
  _prev: PreferencesResult,
  formData: FormData
): Promise<PreferencesResult> {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const totalOccupantsRaw = formData.get("total_occupants") as string;
  const maxRentRaw = formData.get("max_rent") as string;
  const locationTagsRaw = formData.get("location_tags") as string;
  const redirectTo = (formData.get("redirect_to") as string) || null;

  const totalOccupants =
    totalOccupantsRaw && !isNaN(Number(totalOccupantsRaw))
      ? parseInt(totalOccupantsRaw, 10)
      : null;
  const maxRent =
    maxRentRaw && !isNaN(Number(maxRentRaw)) ? parseInt(maxRentRaw, 10) : null;

  const locationTags =
    locationTagsRaw && locationTagsRaw !== "[]" ? locationTagsRaw : null;

  const data = {
    totalOccupants,
    maxRent,
    locationTags,
    quietPlace: parseBool(formData.get("quiet_place") as string),
    hasDog: parseBool(formData.get("has_dog") as string),
    closeToSupermarket: parseBool(
      formData.get("close_to_supermarket") as string
    ),
    closeToBusStop: parseBool(formData.get("close_to_bus_stop") as string),
  };

  await prisma.userPreference.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });

  if (redirectTo) redirect(redirectTo);
  return { success: true };
}
