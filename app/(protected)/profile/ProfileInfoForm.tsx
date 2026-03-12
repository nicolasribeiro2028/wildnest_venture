"use client";

import { useActionState } from "react";
import {
  updateProfileAction,
  type ProfileResult,
} from "@/app/actions/profile";

const inputCls =
  "w-full rounded-[10px] border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#2E2E2E] outline-none focus:ring-2 focus:ring-[#F59E42]/30 focus:border-[#F59E42] transition";

export function ProfileInfoForm({
  defaultFirstName,
  defaultLastName,
  defaultPhone,
  email,
}: {
  defaultFirstName: string;
  defaultLastName: string;
  defaultPhone: string;
  email: string;
}) {
  const [state, formAction] = useActionState<ProfileResult, FormData>(
    updateProfileAction,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          Profile updated.
        </p>
      )}

      <div className="flex gap-3">
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
          First name
          <input
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            defaultValue={defaultFirstName}
            className={inputCls}
          />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
          Last name
          <input
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
            defaultValue={defaultLastName}
            className={inputCls}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
        Email
        <input
          type="email"
          value={email}
          disabled
          className="w-full rounded-[10px] border border-[#E5E5E5] bg-[#F2E9DC] px-3 py-2 text-sm text-zinc-400 cursor-not-allowed"
        />
        <span className="text-xs text-zinc-400">Email cannot be changed.</span>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
        Cellphone{" "}
        <span className="font-normal text-zinc-400">(optional)</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={defaultPhone}
          placeholder="+1 (555) 000-0000"
          className={inputCls}
        />
      </label>

      <button
        type="submit"
        className="mt-1 rounded-[10px] bg-[#F59E42] px-4 py-2.5 font-semibold text-white hover:bg-[#e88928] transition"
      >
        Save changes
      </button>
    </form>
  );
}
