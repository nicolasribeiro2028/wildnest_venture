/**
 * Simple session-based auth — see AGENTS.md Step 3. Intended to be replaced later.
 */
import { getIronSession, type IronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export interface SessionData {
  userId: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET ?? "change-me-in-production-min-32-chars",
  cookieName: "wildnest_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

/** Returns current user id if logged in, null otherwise. */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session.userId ?? null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
