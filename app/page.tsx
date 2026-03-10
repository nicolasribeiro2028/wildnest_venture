import Link from "next/link";
import { getCurrentUserId } from "@/app/lib/auth";

export default async function Home() {
  const userId = await getCurrentUserId();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-4 font-sans dark:bg-zinc-950">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <h1 className="text-center text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Aparturtle — Student Housing
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Find summer and year-long housing near campus.
        </p>
        {userId ? (
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="rounded-lg bg-red-600 px-6 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Go to map & listings
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="rounded-lg bg-red-600 px-6 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg border-2 border-zinc-300 bg-white px-6 py-3 text-lg font-medium text-zinc-800 transition-colors hover:border-red-500 hover:bg-red-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-red-500 dark:hover:bg-red-950/30"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
