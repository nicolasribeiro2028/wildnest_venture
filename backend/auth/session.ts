import 'server-only';
import { getIronSession, type IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  userId: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET ?? 'change-me-in-production-min-32-chars',
  cookieName: 'wildnest_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7,
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session.userId ?? null;
}
