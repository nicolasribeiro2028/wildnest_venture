import Link from "next/link";
import { SignupForm } from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2E9DC] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-[#2E2E2E]">Create account</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Join WildNest to browse and post housing.
        </p>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-[#F59E42] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      <Link href="/" className="mt-4 text-sm font-medium text-zinc-400 hover:text-zinc-600 transition">
        Back to home
      </Link>
    </div>
  );
}
