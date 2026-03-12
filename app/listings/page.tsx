import Link from "next/link";
import { Suspense } from "react";
import { getListings } from "@/app/actions/listings";
import { ListingFilters } from "@/components/listings/ListingFilters";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; term?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const tag = params.tag === "sublet" || params.tag === "landlord" ? params.tag : undefined;
  const term = params.term === "summer" || params.term === "year_long" ? params.term : undefined;
  const sort = params.sort === "price" || params.sort === "date" ? params.sort : "date";

  const listings = await getListings({ tag, term, sort });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Listings
        </h1>
        <Link
          href="/search"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          View on map
        </Link>
      </div>

      <Suspense fallback={<div className="h-14 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />}>
        <ListingFilters currentTag={tag} currentTerm={term} currentSort={sort} />
      </Suspense>

      {listings.length === 0 ? (
        <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            No listings match your filters.
          </p>
          <Link
            href="/listings"
            className="mt-2 inline-block text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Clear filters
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {listings.map((listing) => (
            <li key={listing.id}>
              <Link
                href={`/listings/${listing.id}`}
                className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-amber-300 hover:bg-amber-50/50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-amber-600 dark:hover:bg-amber-950/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-200">
                        {listing.tag}
                      </span>
                      <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {listing.term}
                      </span>
                    </div>
                    <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                      {listing.title}
                    </h2>
                    {listing.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {listing.description}
                      </p>
                    )}
                  </div>
                  {listing.price && (
                    <span className="shrink-0 font-semibold text-zinc-700 dark:text-zinc-300">
                      ${listing.price}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
