import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { Turtle } from "@/components/landing";

const sections = [
  {
    title: "Venture Overview",
    color: "bg-[#FFF3E0] border-[#F59E42]",
    titleColor: "text-[#c46f00]",
    text: "WildNest is a student housing marketplace designed for the Northwestern community. Our goal is to make it easier for students to discover available housing while helping landlords and students who are subletting reach the right audience faster. Today, housing discovery around campus is fragmented. Students rely on a mix of word-of-mouth, Facebook groups, and outdated general housing platforms that are not designed for student life. WildNest aims to centralize this ecosystem by creating a platform tailored specifically to the Northwestern housing market.",
  },
  {
    title: "Problem",
    color: "bg-[#EDE7F6] border-[#4E2A84]",
    titleColor: "text-[#4E2A84]",
    text: "Finding off-campus housing near Northwestern is surprisingly inefficient. From our own experience and conversations with other students, we found that most people spend weeks searching across multiple disconnected channels just to understand what options are available. Students typically rely on Facebook groups, word of mouth, landlord websites, and general platforms like Zillow. These platforms are not designed for student housing, so listings are often outdated or difficult to filter based on factors that matter most to students, such as lease timing, sublets, and proximity to campus. At the same time, landlords and students trying to sublet rooms struggle to reach the right tenants. As a result, both sides experience friction: students struggle to discover housing opportunities, while landlords struggle to fill vacancies efficiently.",
  },
  {
    title: "Why This Matters",
    color: "bg-[#E8F5E9] border-[#22C55E]",
    titleColor: "text-[#15803d]",
    text: "Housing is one of the most important and stressful decisions students make each year. Around universities like Northwestern, housing demand follows the academic calendar: every year students graduate, study abroad, move off campus, or change roommates, and leases often reset at the start of each academic cycle. Despite this predictable turnover, housing discovery remains fragmented and inefficient. Students rely heavily on informal networks, while landlords struggle to consistently reach the right audience at the right time. Even in a single university market like Evanston, student housing represents tens of millions of dollars in annual rental activity. Improving how this market connects renters and landlords could significantly reduce search friction for both sides.",
  },
  {
    title: "Initial Validation",
    color: "bg-[#FFF8E1] border-[#FACC15]",
    titleColor: "text-[#92680a]",
    text: "The idea originated from our own experience searching for housing near Northwestern and from conversations with other students who described the process as fragmented and difficult to navigate. An early signal also came from a landlord we know who manages over 25 student houses in Evanston. While renewing several properties, he sent a message offering $1,000–$2,000 in referral compensation to anyone who could help find students to rent his houses. This highlighted how even landlords with significant student housing supply can struggle to efficiently reach the right tenants. We have also begun speaking with other local landlords and realtors involved in student housing in Evanston, which reinforced our view that discoverability is a real challenge on the supply side as well. These early conversations suggest that the main issue is not necessarily a lack of housing, but rather a fragmented discovery process that makes it difficult for students and landlords to find each other efficiently.",
  },
  {
    title: "Market Thesis",
    color: "bg-[#E3F2FD] border-[#3B82F6]",
    titleColor: "text-[#1d4ed8]",
    text: "Student housing markets are highly localized, dense, and predictable. Every academic year, thousands of students move, graduate, study abroad, or look for new roommates, creating recurring housing demand tied to the university calendar. Despite this structured demand, housing discovery remains fragmented and largely driven by informal networks. We believe this creates an opportunity for a focused, campus-specific marketplace that centralizes listings and simplifies how students and landlords connect. Our strategy is to start with a single university ecosystem, where network effects can develop locally before expanding to other campuses with similar dynamics.",
  },
  {
    title: "Vision",
    color: "bg-[#FCE4EC] border-[#EF4444]",
    titleColor: "text-[#b91c1c]",
    text: "Our long-term vision is to become the trusted housing discovery platform for university communities, starting with Northwestern. By centralizing listings, improving recommendation systems, increasing visibility, and simplifying how renters and landlords connect, we aim to make student housing discovery faster, clearer, and more reliable. If successful, the same model could eventually expand to other universities, creating a network of campus-focused housing marketplaces built around the needs of students.",
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
            WildNest
          </p>
          <h1 className="mt-1 font-heading text-4xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-5xl">
            WildNest: Student Housing Marketplace
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
        {/* Proposed Solution — standalone card */}
        <div className="mb-6 rounded-2xl border-2 bg-white border-[#F59E42] px-6 py-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold text-[#c46f00]">
            Proposed Idea
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-[#2E2E2E]">
            Our idea is to create a two-sided marketplace:
          </p>
          <ul className="mb-4 space-y-2 text-sm leading-relaxed text-[#2E2E2E]">
            <li className="flex gap-2">
              <span className="mt-0.5 flex-shrink-0 text-[#F59E42]">●</span>
              <span>
                <strong>For students:</strong> a simpler, faster and more efficient way to discover housing opportunities relevant to their sizing, budget, and location needs.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 flex-shrink-0 text-[#F59E42]">●</span>
              <span>
                <strong>For landlords / subletters:</strong> a direct and more efficient way to reach Northwestern students and fill units more quickly.
              </span>
            </li>
          </ul>
          <p className="mb-2 text-sm font-medium text-[#2E2E2E]">Potential product features:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Centralized student housing listings",
              "Student-focused filters",
              "Lease term & sublet tagging",
              "Direct contact between students and landlords",
              "Saved listings and availability alerts",
              "Personalized recommendations based on preferences",
              "Demand insights for landlords",
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
