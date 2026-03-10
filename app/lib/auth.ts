// Thin wrapper re-exporting auth helpers from the backend layer.
export type { SessionData } from '@/backend/auth/session';
export { getSession, getCurrentUserId } from '@/backend/auth/session';
export { hashPassword, verifyPassword } from '@/backend/auth/password';
