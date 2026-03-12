"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  savePreferencesAction,
  type PreferencesResult,
} from "@/app/actions/preferences";

const LOCATION_TAGS = [
  { value: "north_campus", label: "North Campus" },
  { value: "central_campus", label: "Central Campus" },
  { value: "south_campus", label: "South Campus" },
  { value: "close_to_evanston", label: "Close to Evanston" },
  { value: "downtown_evanston", label: "Downtown Evanston" },
  { value: "south_evanston", label: "South Evanston" },
];

type BoolPref = "yes" | "no" | null;

export type PreferencesDefaults = {
  totalOccupants?: number | null;
  maxRent?: number | null;
  locationTags?: string[];
  quietPlace?: boolean | null;
  hasDog?: boolean | null;
  closeToSupermarket?: boolean | null;
  closeToBusStop?: boolean | null;
};

function toBoolPref(val: boolean | null | undefined): BoolPref {
  if (val === true) return "yes";
  if (val === false) return "no";
  return null;
}

const inputCls =
  "w-full rounded-[10px] border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#2E2E2E] outline-none focus:ring-2 focus:ring-[#F59E42]/30 focus:border-[#F59E42] transition";

function YNToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: BoolPref;
  onChange: (v: BoolPref) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E5E5] bg-white px-4 py-3">
      <span className="text-sm font-medium text-[#2E2E2E]">{label}</span>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(value === opt ? null : opt)}
            className={`rounded-full px-4 py-1 text-sm font-semibold transition ${
              value === opt
                ? opt === "yes"
                  ? "bg-[#F59E42] text-white"
                  : "bg-[#4E2A84] text-white"
                : "bg-[#F2E9DC] text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            {opt === "yes" ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PreferencesForm({
  defaults,
  redirectTo,
  showSkip,
  submitLabel = "Save preferences",
}: {
  defaults?: PreferencesDefaults;
  redirectTo?: string;
  showSkip?: boolean;
  submitLabel?: string;
}) {
  const [state, formAction] = useActionState<PreferencesResult, FormData>(
    savePreferencesAction,
    {}
  );

  const [locationTags, setLocationTags] = useState<string[]>(
    defaults?.locationTags ?? []
  );
  const [quietPlace, setQuietPlace] = useState<BoolPref>(
    toBoolPref(defaults?.quietPlace)
  );
  const [hasDog, setHasDog] = useState<BoolPref>(toBoolPref(defaults?.hasDog));
  const [closeToSupermarket, setCloseToSupermarket] = useState<BoolPref>(
    toBoolPref(defaults?.closeToSupermarket)
  );
  const [closeToBusStop, setCloseToBusStop] = useState<BoolPref>(
    toBoolPref(defaults?.closeToBusStop)
  );

  const toggleTag = (tag: string) =>
    setLocationTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Hidden controlled-state inputs */}
      <input
        type="hidden"
        name="location_tags"
        value={JSON.stringify(locationTags)}
      />
      <input type="hidden" name="quiet_place" value={quietPlace ?? ""} />
      <input type="hidden" name="has_dog" value={hasDog ?? ""} />
      <input
        type="hidden"
        name="close_to_supermarket"
        value={closeToSupermarket ?? ""}
      />
      <input
        type="hidden"
        name="close_to_bus_stop"
        value={closeToBusStop ?? ""}
      />
      {redirectTo && (
        <input type="hidden" name="redirect_to" value={redirectTo} />
      )}

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.success && !redirectTo && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Preferences saved.
        </p>
      )}

      {/* Occupants + rent */}
      <div className="flex gap-3">
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
          Total occupants
          <input
            name="total_occupants"
            type="number"
            min={1}
            max={20}
            defaultValue={defaults?.totalOccupants ?? ""}
            placeholder="e.g. 2"
            className={inputCls}
          />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
          Max rent ($/mo)
          <input
            name="max_rent"
            type="number"
            min={0}
            step={50}
            defaultValue={defaults?.maxRent ?? ""}
            placeholder="e.g. 1500"
            className={inputCls}
          />
        </label>
      </div>

      {/* Location tags */}
      <div>
        <p className="mb-2 text-sm font-medium text-[#2E2E2E]">
          Preferred area{" "}
          <span className="font-normal text-zinc-400">(pick any)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {LOCATION_TAGS.map((tag) => {
            const selected = locationTags.includes(tag.value);
            return (
              <button
                key={tag.value}
                type="button"
                onClick={() => toggleTag(tag.value)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  selected
                    ? "border-[#F59E42] bg-[#F59E42] text-white"
                    : "border-[#E5E5E5] bg-white text-zinc-600 hover:border-[#F59E42]"
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Y/N preferences */}
      <div>
        <p className="mb-2 text-sm font-medium text-[#2E2E2E]">
          Lifestyle preferences
        </p>
        <div className="flex flex-col gap-2">
          <YNToggle
            label="I want a quiet place"
            value={quietPlace}
            onChange={setQuietPlace}
          />
          <YNToggle
            label="I have a dog"
            value={hasDog}
            onChange={setHasDog}
          />
          <YNToggle
            label="Close to supermarket"
            value={closeToSupermarket}
            onChange={setCloseToSupermarket}
          />
          <YNToggle
            label="Close to bus stop"
            value={closeToBusStop}
            onChange={setCloseToBusStop}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="flex-1 rounded-[10px] bg-[#F59E42] px-4 py-2.5 font-semibold text-white hover:bg-[#e88928] transition"
        >
          {submitLabel}
        </button>
        {showSkip && (
          <Link
            href="/"
            className="rounded-[10px] border border-[#E5E5E5] px-4 py-2.5 text-sm font-medium text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 transition"
          >
            Skip for now
          </Link>
        )}
      </div>
    </form>
  );
}
