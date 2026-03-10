"use client";

import { useActionState } from "react";
import { signupAction, type AuthResult } from "@/app/actions/auth";

const initialState: AuthResult = {};

export function SignupForm() {
  const [state, formAction] = useActionState(signupAction, initialState);

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-4">
      {state?.error && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {state.error}
        </p>
      )}
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Name <span className="font-normal text-zinc-500">(optional)</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Password <span className="font-normal text-zinc-500">(min 8 characters)</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </label>
      <button
        type="submit"
        className="mt-2 rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
      >
        Sign up
      </button>
    </form>
  );
}
