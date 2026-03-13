import Link from "next/link";
import { getDiscoveryListings } from "@/app/actions/listings";
import { DiscoveryDeck } from "@/components/discovery/DiscoveryDeck";

export default async function DiscoverPage() {
  const listings = await getDiscoveryListings({ limit: 4 });

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#F2E9DC] px-4 py-10">
      {/* Step badge */}
      <div className="mb-6 flex w-full max-w-sm items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#F59E42]/15 px-2.5 py-0.5 text-xs font-semibold text-[#F59E42]">
            Step 3 of 3
          </span>
          <span className="text-sm font-semibold text-[#2E2E2E]">
            Discover listings
          </span>
        </div>
        <Link
          href="/"
          className="text-xs font-medium text-zinc-400 hover:text-zinc-600 transition"
        >
          Skip for now
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6 w-full max-w-sm text-center">
        <p className="text-sm text-zinc-500">
          React to a few listings so we can learn what you like.
          <br />
          We are later using this to get more information for your future house — just explore!
        </p>
      </div>

      {/* Deck */}
      <div className="w-full max-w-sm">
        <DiscoveryDeck
          listings={listings}
          doneCta={{ label: "Go to home →", href: "/" }}
        />
      </div>
    </div>
  );
}
