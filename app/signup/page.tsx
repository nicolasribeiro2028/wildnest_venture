import Link from "next/link";
import { SignupForm } from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 font-sans">
      <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          Create account
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Sign up with your email and a password (min 8 characters).
        </p>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-red-600 underline hover:text-red-700 dark:text-red-400"
          >
            Sign in
          </Link>
        </p>
      </div>
      <Link
        href="/"
        className="text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        Back to home
      </Link>
    </div>
  );
}
