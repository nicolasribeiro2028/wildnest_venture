import Link from "next/link";
import { Suspense } from "react";
import { PostListingForm } from "@/components/listings/PostListingForm";

export default function PostListingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/listings"
        className="mb-6 inline-block text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← Back to listings
      </Link>
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Post a listing
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Add your sublet or landlord listing to the map.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />}>
          <PostListingForm />
        </Suspense>
      </div>
    </div>
  );
}
