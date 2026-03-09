import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50 px-4 font-sans dark:bg-zinc-950">
      <div className="flex w-full max-w-2xl flex-col items-center gap-8">
        <div className="flex min-h-[200px] w-full items-center justify-center rounded-lg bg-red-600 px-6 py-12 text-center text-2xl font-semibold text-white shadow-lg">
          More info soon
        </div>
        <Link
          href="/search"
          className="rounded-lg border-2 border-zinc-300 bg-white px-6 py-3 text-lg font-medium text-zinc-800 transition-colors hover:border-red-500 hover:bg-red-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-red-500 dark:hover:bg-red-950/30"
        >
          Check the search engine
        </Link>
      </div>
    </div>
  );
}
