"use client";

import Link from "next/link";
import { deleteListingAction } from "@/app/actions/listings";

interface ListingActionsProps {
  listingId: string;
}

export function ListingActions({ listingId }: ListingActionsProps) {
  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    await deleteListingAction(listingId);
  }

  return (
    <div className="flex gap-4">
      <Link
        href={`/listings/${listingId}/edit`}
        className="text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400"
      >
        Edit listing
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Delete listing
      </button>
    </div>
  );
}
