"use client";

import { useActionState } from "react";
import { signupAction, type AuthResult } from "@/app/actions/auth";

const initialState: AuthResult = {};

const inputCls =
  "w-full rounded-[10px] border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#2E2E2E] outline-none focus:ring-2 focus:ring-[#F59E42]/30 focus:border-[#F59E42] transition";
export function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-4">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
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
            className={inputCls}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputCls}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
        Cellphone{" "}
        <span className="font-normal text-zinc-400">(optional)</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          className={inputCls}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
        Password{" "}
        <span className="font-normal text-zinc-400">(min 8 characters)</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputCls}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-[#2E2E2E]">
        Confirm password
        <input
          name="confirm_password"
          type="password"
          autoComplete="new-password"
          required
          className={inputCls}
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-[10px] bg-[#F59E42] px-4 py-2.5 font-semibold text-white hover:bg-[#e88928] transition"
      >
        Create account
      </button>
    </form>
  );
}
