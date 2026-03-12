"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { getCurrentUserId } from "@/app/lib/auth";

export type ProfileResult = { error?: string; success?: boolean };

export async function updateProfileAction(
  _prev: ProfileResult,
  formData: FormData
): Promise<ProfileResult> {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const firstName = (formData.get("first_name") as string)?.trim();
  const lastName = (formData.get("last_name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;

  if (!firstName || !lastName) {
    return { error: "First name and last name are required." };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { firstName, lastName, phone },
  });

  return { success: true };
}
