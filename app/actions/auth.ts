"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { getSession, hashPassword, verifyPassword } from "@/app/lib/auth";

export type AuthResult = { error?: string };

export async function signupAction(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const firstName = (formData.get("first_name") as string)?.trim();
  const lastName = (formData.get("last_name") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || null;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (!email || !firstName || !lastName || !password) {
    return { error: "First name, last name, email, and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, firstName, lastName, phone, passwordHash },
  });

  const session = await getSession();
  session.userId = user.id;
  await session.save();

  redirect("/signup/preferences");
}

export async function loginAction(_prev: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirect") as string | null;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Invalid email or password." };
  }

  const session = await getSession();
  session.userId = user.id;
  await session.save();

  const target = redirectTo?.startsWith("/") ? redirectTo : "/";
  redirect(target);
}

export async function logoutAction(): Promise<void> {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
