import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingById } from "@/app/actions/listings";
import { getCurrentUserId } from "@/app/lib/auth";
import { ListingActions } from "@/components/listings/ListingActions";
import { ListingImages } from "@/components/listings/ListingImages";
import { MessageButton } from "@/components/listings/MessageButton";

export default async function ListingDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const listing = await getListingById(id);
  if (!listing) notFound();

  const userId = await getCurrentUserId();
  const isOwner = userId === listing.userId;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/search"
        className="mb-4 inline-block text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← Back to map
      </Link>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {decodeURIComponent(error)}
        </div>
      )}
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
        <ListingImages imageUrls={listing.imageUrls} variant="detail" />
        {listing.description && (
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {listing.description}
          </p>
        )}
        {listing.user && (
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            Listed by {listing.user.firstName} {listing.user.lastName}
          </p>
        )}
        {!isOwner && userId && (
          <div className="mt-6">
            <MessageButton listingId={listing.id} />
          </div>
        )}
        {!isOwner && !userId && (
          <div className="mt-6">
            <Link
              href={`/login?redirect=/listings/${listing.id}`}
              className="inline-block rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600"
            >
              Sign in to message
            </Link>
          </div>
        )}
        {isOwner && (
          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <ListingActions listingId={listing.id} />
          </div>
        )}
      </article>
    </div>
  );
}
