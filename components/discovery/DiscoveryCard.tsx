"use client";

import Image from "next/image";
import { LISTING_AMENITY_TAGS } from "@/components/listings/ListingTagsPicker";
import { parseImageUrls } from "@/app/lib/image-urls";

export type SwipeDirection = "left" | "right" | "up";

export type DiscoveryListing = {
  id: string;
  title: string;
  price: string | null;
  tag: string;
  term: string;
  imageUrls: string | null;
  amenityTags: string | null;
};

interface DiscoveryCardProps {
  listing: DiscoveryListing;
  animating: SwipeDirection | null;
  onReact: (dir: SwipeDirection) => void;
}

const animClass: Record<SwipeDirection, string> = {
  left:  "animate-swipe-left",
  right: "animate-swipe-right",
  up:    "animate-swipe-up",
};

const overlayClass: Record<SwipeDirection, string> = {
  left:  "bg-red-500/30",
  right: "bg-green-500/30",
  up:    "bg-zinc-300/20",
};

export function DiscoveryCard({ listing, animating, onReact }: DiscoveryCardProps) {
  const urls = parseImageUrls(listing.imageUrls);
  const hasImage = urls.length > 0;

  let amenityTags: string[] = [];
  try {
    amenityTags = listing.amenityTags ? (JSON.parse(listing.amenityTags) as string[]) : [];
  } catch { /* empty */ }

  return (
    <div
      className={`relative w-full max-w-sm mx-auto select-none ${animating ? animClass[animating] : ""}`}
      onAnimationEnd={() => { /* parent handles via state */ }}
    >
      {/* Color overlay that appears during animation */}
      {animating && (
        <div
          className={`pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity ${overlayClass[animating]}`}
        />
      )}

      <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-md">
        {/* Image / placeholder */}
        <div className="relative aspect-video w-full bg-[#F2E9DC]">
          {hasImage ? (
            <Image
              src={urls[0]}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 384px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">
              🏠
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              {listing.tag}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500">
              {listing.term.replace("_", "-")}
            </span>
          </div>

          <h3 className="text-base font-semibold text-[#2E2E2E] leading-snug">
            {listing.title}
          </h3>

          {listing.price && (
            <p className="mt-1 text-sm font-semibold text-[#F59E42]">
              ${listing.price}
              <span className="font-normal text-zinc-400">/mo</span>
            </p>
          )}

          {amenityTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {amenityTags.map((val) => {
                const def = LISTING_AMENITY_TAGS.find((t) => t.value === val);
                return def ? (
                  <span
                    key={val}
                    className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700"
                  >
                    {def.emoji} {def.label}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-5 border-t border-[#E5E5E5] px-4 py-4">
          <button
            type="button"
            onClick={() => onReact("left")}
            disabled={!!animating}
            aria-label="Dislike"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-200 bg-white text-2xl shadow-sm transition hover:bg-red-50 hover:border-red-400 disabled:opacity-40"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={() => onReact("up")}
            disabled={!!animating}
            aria-label="Neutral"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-zinc-200 bg-white text-xl shadow-sm transition hover:bg-zinc-50 hover:border-zinc-400 disabled:opacity-40"
          >
            —
          </button>

          <button
            type="button"
            onClick={() => onReact("right")}
            disabled={!!animating}
            aria-label="Like"
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-200 bg-white text-2xl shadow-sm transition hover:bg-green-50 hover:border-green-400 disabled:opacity-40"
          >
            ✓
          </button>
        </div>
      </div>
    </div>
  );
}
