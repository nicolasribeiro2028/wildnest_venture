import Link from "next/link";
import { getCurrentUserId } from "@/app/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export async function AppHeader() {
  const userId = await getCurrentUserId();

  return (
    <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <nav className="mx-auto flex max-w-4xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/search"
            className="font-semibold text-zinc-800 dark:text-zinc-100"
          >
            WildNest
          </Link>
          <Link
            href="/listings"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Listings
          </Link>
          {userId && (
            <>
              <Link
                href="/messages"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Messages
              </Link>
              <Link
                href="/my-sublets"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                Manage my sublets
              </Link>
              <Link
                href="/listings/new"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
              >
                Post listing
              </Link>
            </>
          )}
        </div>
        {userId ? (
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Sign out
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
