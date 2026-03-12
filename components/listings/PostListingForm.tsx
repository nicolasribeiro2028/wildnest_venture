"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PinPicker } from "@/components/map/PinPicker";
import { createListingAction } from "@/app/actions/listings";
import type { ListingFormData } from "@/app/actions/listings";

const initialState = { error: "" as string | undefined };

export function PostListingForm() {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");
  const returnTo = searchParams.get("returnTo");
  const defaultTag = tagParam === "sublet" || tagParam === "landlord" ? tagParam : "sublet";

  const [state, formAction] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const pinXVal = parseFloat(formData.get("pinX") as string) || 50;
      const pinYVal = parseFloat(formData.get("pinY") as string) || 45;
      const data: ListingFormData & { returnTo?: string } = {
        tag: (formData.get("tag") as "sublet" | "landlord") || "sublet",
        term: (formData.get("term") as "summer" | "year_long") || "summer",
        title: (formData.get("title") as string)?.trim() || "",
        description: (formData.get("description") as string)?.trim() || undefined,
        price: (formData.get("price") as string)?.trim() || undefined,
        startDate: (formData.get("startDate") as string)?.trim() || undefined,
        endDate: (formData.get("endDate") as string)?.trim() || undefined,
        pinX: pinXVal,
        pinY: pinYVal,
        returnTo: (formData.get("returnTo") as string) || undefined,
      };
      return createListingAction(data);
    },
    initialState
  );

  const [pinX, setPinX] = useState(50);
  const [pinY, setPinY] = useState(45);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="pinX" value={pinX} />
      <input type="hidden" name="pinY" value={pinY} />
      {returnTo === "my-sublets" && (
        <input type="hidden" name="returnTo" value="my-sublets" />
      )}
      {state?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tag"
              value="sublet"
              defaultChecked={defaultTag === "sublet"}
            />
            <span>Sublet</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tag"
              value="landlord"
              defaultChecked={defaultTag === "landlord"}
            />
            <span>Landlord</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Term
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="term" value="summer" defaultChecked />
            <span>Summer</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="term" value="year_long" />
            <span>Year-long</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="e.g. Cozy room near campus"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="Describe the listing..."
        />
      </div>

      <div>
        <label htmlFor="price" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Price ($/month)
        </label>
        <input
          id="price"
          name="price"
          type="text"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="e.g. 850"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Start date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            End date
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Location on map
        </label>
        <PinPicker
          pinX={pinX}
          pinY={pinY}
          onSelect={(x, y) => {
            setPinX(x);
            setPinY(y);
          }}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="rounded-lg bg-amber-500 px-6 py-2 font-semibold text-white hover:bg-amber-600"
        >
          Post listing
        </button>
        <Link
          href={returnTo === "my-sublets" ? "/my-sublets" : "/listings"}
          className="rounded-lg border border-zinc-300 px-6 py-2 font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
