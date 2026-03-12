import { PreferencesForm } from "@/components/preferences/PreferencesForm";

export default function SignupPreferencesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F2E9DC] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-full bg-[#F59E42]/15 px-2.5 py-0.5 text-xs font-semibold text-[#F59E42]">
            Step 2 of 2
          </span>
        </div>
        <h1 className="text-xl font-semibold text-[#2E2E2E]">
          Your room preferences
        </h1>
        <p className="mt-1 mb-5 text-sm text-zinc-500">
          Help us match you with the right listings. You can always update this
          later.
        </p>
        <PreferencesForm redirectTo="/" showSkip submitLabel="Save & continue" />
      </div>
    </div>
  );
}
