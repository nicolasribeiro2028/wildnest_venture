"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface ListingFiltersProps {
  currentTag?: "sublet" | "landlord";
  currentTerm?: "summer" | "year_long";
  currentSort?: "date" | "price";
}

export function ListingFilters({
  currentTag,
  currentTerm,
  currentSort = "date",
}: ListingFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/listings?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Tag:
        </span>
        <select
          value={currentTag ?? ""}
          onChange={(e) =>
            updateFilter("tag", e.target.value || null)
          }
          className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="">All</option>
          <option value="sublet">Sublet</option>
          <option value="landlord">Landlord</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Term:
        </span>
        <select
          value={currentTerm ?? ""}
          onChange={(e) =>
            updateFilter("term", e.target.value || null)
          }
          className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="">All</option>
          <option value="summer">Summer</option>
          <option value="year_long">Year-long</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Sort:
        </span>
        <select
          value={currentSort}
          onChange={(e) =>
            updateFilter("sort", e.target.value)
          }
          className="rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="date">Newest first</option>
          <option value="price">Price (low to high)</option>
        </select>
      </div>
    </div>
  );
}
