import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { getCurrentUserId } from "@/app/lib/auth";
import { ProfileInfoForm } from "./ProfileInfoForm";
import { PreferencesForm } from "@/components/preferences/PreferencesForm";

export default async function ProfilePage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { preferences: true },
  });
  if (!user) redirect("/login");

  const prefs = user.preferences;
  const prefDefaults = prefs
    ? {
        totalOccupants: prefs.totalOccupants,
        maxRent: prefs.maxRent,
        locationTags: prefs.locationTags
          ? (JSON.parse(prefs.locationTags) as string[])
          : [],
        quietPlace: prefs.quietPlace,
        hasDog: prefs.hasDog,
        closeToSupermarket: prefs.closeToSupermarket,
        closeToBusStop: prefs.closeToBusStop,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-[#F2E9DC] px-4 py-10">
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#2E2E2E]">Profile</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your account info and room preferences.
          </p>
        </div>

        {/* Account info */}
        <section className="rounded-2xl border border-[#E5E5E5] bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-[#2E2E2E]">
            Account info
          </h2>
          <ProfileInfoForm
            defaultFirstName={user.firstName}
            defaultLastName={user.lastName}
            defaultPhone={user.phone ?? ""}
            email={user.email}
          />
        </section>

        {/* Room preferences */}
        <section className="rounded-2xl border border-[#E5E5E5] bg-white p-5">
          <h2 className="mb-4 text-base font-semibold text-[#2E2E2E]">
            Room preferences
          </h2>
          <PreferencesForm defaults={prefDefaults} submitLabel="Save preferences" />
        </section>
      </div>
    </div>
  );
}
