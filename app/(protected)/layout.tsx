import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/app/lib/auth";
import { AppHeader } from "@/components/shared/AppHeader";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
