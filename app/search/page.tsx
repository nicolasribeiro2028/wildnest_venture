import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 font-sans">
      <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
        Search engine
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Map and listings will go here.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-red-600 underline hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Back to home
      </Link>
    </div>
  );
}
