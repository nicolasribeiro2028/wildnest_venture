import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingById } from "@/app/actions/listings";
import { getCurrentUserId } from "@/app/lib/auth";
import { EditListingForm } from "@/components/listings/EditListingForm";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing) notFound();

  const userId = await getCurrentUserId();
  if (!userId || listing.userId !== userId) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href={`/listings/${id}`}
        className="mb-6 inline-block text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← Back to listing
      </Link>
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Edit listing
      </h1>
      <div className="mt-8">
        <EditListingForm
          listingId={listing.id}
          initialData={{
            tag: listing.tag,
            term: listing.term,
            title: listing.title,
            description: listing.description,
            price: listing.price,
            startDate: listing.startDate,
            endDate: listing.endDate,
            pinX: listing.pinX,
            pinY: listing.pinY,
          }}
        />
      </div>
    </div>
  );
}
