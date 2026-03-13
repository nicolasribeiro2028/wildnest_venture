"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  DiscoveryCard,
  type DiscoveryListing,
  type SwipeDirection,
} from "./DiscoveryCard";

interface DiscoveryDeckProps {
  listings: DiscoveryListing[];
  doneCta?: { label: string; href: string };
}

export function DiscoveryDeck({
  listings,
  doneCta = { label: "Go to home", href: "/" },
}: DiscoveryDeckProps) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState<SwipeDirection | null>(null);

  const handleReact = useCallback(
    (dir: SwipeDirection) => {
      if (animating) return;
      setAnimating(dir);
      // Advance after animation completes
      setTimeout(() => {
        setAnimating(null);
        setIndex((i) => i + 1);
      }, 340);
    },
    [animating]
  );

  const total = listings.length;
  const done = index >= total;

  if (total === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-zinc-400">
        <span className="text-4xl">🏠</span>
        <p className="text-sm">No listings to discover yet.</p>
        <Link
          href={doneCta.href}
          className="mt-2 rounded-full bg-[#F59E42] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e88928] transition"
        >
          {doneCta.label}
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <span className="text-5xl">🎉</span>
        <p className="text-lg font-semibold text-[#2E2E2E]">
          You&apos;ve seen them all!
        </p>
        <p className="text-sm text-zinc-400">
          We&apos;ll use your picks to improve recommendations later.
        </p>
        <Link
          href={doneCta.href}
          className="mt-2 rounded-full bg-[#F59E42] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#e88928] transition"
        >
          {doneCta.label}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {listings.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${
              i < index
                ? "w-4 bg-[#F59E42]"
                : i === index
                ? "w-6 bg-[#F59E42]"
                : "w-2 bg-zinc-200"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-zinc-400">
          {index + 1} / {total}
        </span>
      </div>

      {/* Card */}
      <DiscoveryCard
        key={index}
        listing={listings[index]}
        animating={animating}
        onReact={handleReact}
      />

      {/* Hint */}
      <p className="text-xs text-zinc-400">
        <span className="text-red-400 font-medium">✕ dislike</span>
        {"  ·  "}
        <span className="font-medium text-zinc-400">— neutral</span>
        {"  ·  "}
        <span className="text-green-500 font-medium">✓ like</span>
      </p>
    </div>
  );
}
