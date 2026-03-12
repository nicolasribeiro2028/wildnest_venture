import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { Turtle } from "@/components/landing";

const sections = [
  {
    title: "Venture Overview",
    color: "bg-[#FFF3E0] border-[#F59E42]",
    titleColor: "text-[#c46f00]",
    text: "We are building a housing marketplace designed for the Evanston and Northwestern student community. Our goal is to make it easier for students to find relevant, available housing opportunities while also helping landlords and student subletters fill vacancies faster. Today, students often rely on outdated housing portals, fragmented recommendation systems, and word-of-mouth networks that are slow, incomplete, and inefficient. At the same time, landlords and individuals trying to rent apartments or sublet rooms struggle to reach the right audience in a centralized and trusted way. Our platform aims to solve both sides of this problem by creating a more direct, student-centered, and localized housing discovery experience.",
  },
  {
    title: "Problem",
    color: "bg-[#EDE7F6] border-[#4E2A84]",
    titleColor: "text-[#4E2A84]",
    text: "Northwestern students face major friction when searching for housing. Existing platforms such as general listing websites are often outdated, do not reflect the full set of available apartments, and make it difficult to identify options that are actually relevant to student needs. Students waste time contacting unavailable listings, navigating inefficient communication channels, and depending on informal recommendations that do not scale well. On the supply side, landlords and student renters often lack an effective and trusted channel to promote available units directly to the Northwestern and Evanston housing market.",
  },
  {
    title: "Why This Matters",
    color: "bg-[#E8F5E9] border-[#22C55E]",
    titleColor: "text-[#15803d]",
    text: "Housing is one of the most important and stressful parts of student life. A fragmented housing search creates unnecessary time loss, uncertainty, and missed opportunities for both renters and property owners. In a localized market like Evanston, where housing demand is seasonal and highly tied to the university calendar, a purpose-built solution can create meaningful value by improving visibility, speed, and trust.",
  },
  {
    title: "Initial Validation",
    color: "bg-[#FFF8E1] border-[#FACC15]",
    titleColor: "text-[#92680a]",
    text: "Our early validation comes from repeated observations among colleagues and peers at Northwestern. Students report difficulty finding complete and updated listings through Zillow and similar portals, and often spend time scheduling or pursuing apartments that are no longer available or not suitable. At the same time, landlords and students seeking summer subletters often do not know where to post effectively in order to reach the right audience. These patterns suggest a real coordination problem in a niche but high-intensity market.",
  },
  {
    title: "Market Thesis",
    color: "bg-[#E3F2FD] border-[#3B82F6]",
    titleColor: "text-[#1d4ed8]",
    text: "We believe there is an opportunity to build a localized housing app for the Evanston community, beginning with Northwestern students. The product would allow both landlords and individuals to list long-term leases and summer sublets in a centralized place tailored to student housing needs. By focusing first on a specific community with clear seasonal housing demand, we can create a dense and trusted marketplace before expanding features or geography.",
  },
  {
    title: "Vision",
    color: "bg-[#FCE4EC] border-[#EF4444]",
    titleColor: "text-[#b91c1c]",
    text: "Our long-term vision is to become the trusted housing discovery layer for university-centered communities, starting with Evanston. We want to reduce search friction, improve listing transparency, and create a better housing matching process for both demand and supply.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      {/* Hero */}
      <header className="flex flex-col items-center gap-5 border-b border-[var(--color-border)] bg-[var(--color-background)] px-6 py-10">
        <Image
          src="/assets/wildnest_logo.png"
          alt="WildNest"
          width={180}
          height={60}
          priority
          className="h-auto w-[130px] sm:w-[170px]"
        />
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E42]">
            Student Housing Marketplace
          </p>
          <h1 className="mt-1 font-heading text-4xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-5xl">
            Housing for Evanston<br className="hidden sm:block" /> &amp; Northwestern
          </h1>
          <p className="mt-3 text-base text-[var(--color-foreground)]/60">
            Find sublets, year-long leases, and connect with landlords — all in one place.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/search" variant="primary" className="min-w-[140px]">
            Explore listings
          </ButtonLink>
          <ButtonLink href="/signup" variant="secondary" className="min-w-[140px]">
            Create account
          </ButtonLink>
          <Link
            href="/login"
            className="text-sm font-medium text-[var(--color-foreground)]/60 underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        {/* Title card */}
        <div className="mb-8 rounded-2xl bg-[#4E2A84] px-8 py-7 text-white shadow-md">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-200">
            Housing Venture Idea
          </p>
          <h2 className="mt-1 text-2xl font-semibold leading-snug sm:text-3xl">
            Student Housing Marketplace<br className="hidden sm:block" /> for Evanston / Northwestern
          </h2>
        </div>

        {/* Proposed Solution — standalone card */}
        <div className="mb-6 rounded-2xl border-2 bg-white border-[#F59E42] px-6 py-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-[#c46f00]">
            Proposed Solution
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-[#2E2E2E]">
            The app will serve as a two-sided marketplace:
          </p>
          <ul className="mb-4 space-y-2 text-sm leading-relaxed text-[#2E2E2E]">
            <li className="flex gap-2">
              <span className="mt-0.5 flex-shrink-0 text-[#F59E42]">●</span>
              <span>
                <strong>For students:</strong> a simpler way to discover housing opportunities relevant to their timing, budget, and location needs.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 flex-shrink-0 text-[#F59E42]">●</span>
              <span>
                <strong>For landlords / subletters:</strong> a direct way to reach Northwestern students and fill units more quickly.
              </span>
            </li>
          </ul>
          <p className="mb-2 text-sm font-medium text-[#2E2E2E]">Potential product features:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Verified & updated listings",
              "Student-friendly filters",
              "Lease term & sublet tagging",
              "Direct contact / inquiry flow",
              "Availability status tracking",
              "Localized Evanston / Northwestern focus",
            ].map((f) => (
              <span
                key={f}
                className="rounded-full border border-[#F59E42]/40 bg-[#FFF3E0] px-3 py-1 text-xs font-medium text-[#c46f00]"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Section cards */}
        <div className="space-y-5">
          {sections.map((s) => (
            <div
              key={s.title}
              className={`rounded-2xl border-2 px-6 py-5 shadow-sm ${s.color}`}
            >
              <h3 className={`mb-2 text-lg font-semibold ${s.titleColor}`}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#2E2E2E]">{s.text}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-4 border-t border-[var(--color-border)] bg-[var(--color-background)] py-8">
        <Turtle className="h-12 w-16 text-[var(--color-primary)] sm:h-14 sm:w-20" />
        <p className="text-xs text-[var(--color-foreground)]/40">
          © Created by Nicolas Ribeiro
        </p>
      </footer>
    </div>
  );
}
