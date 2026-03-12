import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/app/lib/db";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { user: { select: { name: true } } },
  });

  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/search"
        className="mb-4 inline-block text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← Back to map
      </Link>
      <article className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
            {listing.tag}
          </span>
          <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {listing.term}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          {listing.title}
        </h1>
        {listing.price && (
          <p className="mt-2 text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            ${listing.price}
          </p>
        )}
        {listing.description && (
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {listing.description}
          </p>
        )}
        {listing.user.name && (
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Listed by {listing.user.name}
          </p>
        )}
      </article>
    </div>
  );
}
