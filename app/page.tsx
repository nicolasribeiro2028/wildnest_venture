import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { Turtle } from "@/components/landing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      {/* Hero — Soft Sand background, logo, Laranja accents */}
      <header className="flex flex-col items-center gap-6 border-b border-[var(--color-border)] bg-[var(--color-background)] px-[var(--container-padding)] py-10">
        <Image
          src="/assets/wildnest_logo.png"
          alt="WildNest"
          width={180}
          height={60}
          priority
          className="h-auto w-[140px] sm:w-[180px]"
        />
        <div className="text-center">
          <h1 className="font-heading text-[var(--h1-size)] font-[var(--h1-weight)] leading-[var(--leading-heading)] text-[var(--color-foreground)]">
            WildNest
          </h1>
          <p className="mt-2 text-[var(--text-lg)] leading-[var(--leading-body)] text-[var(--color-foreground)]/80">
            Student housing — summer & year-long
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[var(--container-max)] flex-1 flex-col items-center gap-10 px-[var(--container-padding)] py-12">
        {/* Info block — card style */}
        <section
          className="w-full max-w-2xl rounded-[var(--radius-card)] bg-[var(--color-surface)] px-8 py-12 text-center shadow-[var(--card-shadow)]"
          aria-label="Coming soon"
        >
          <p className="font-heading text-[var(--text-3xl)] font-[var(--h3-weight)] leading-[var(--leading-heading)] text-[var(--color-foreground)]">
            More info soon
          </p>
        </section>

        {/* CTAs: Sign in / Sign up */}
        <section className="flex flex-wrap items-center justify-center gap-[var(--space-4)]">
          <ButtonLink href="/login" variant="primary" className="min-w-[140px]">
            Sign in
          </ButtonLink>
          <ButtonLink href="/signup" variant="secondary" className="min-w-[140px]">
            Sign up
          </ButtonLink>
        </section>

        {/* Search engine entry — outline style */}
        <Link
          href="/search"
          className="rounded-[var(--radius-pill)] border border-[var(--color-border)] px-6 py-3 font-[var(--btn-font-weight)] text-[var(--color-foreground)] transition-[var(--btn-transition)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white"
        >
          Check the search engine
        </Link>
      </main>

      {/* Turtle at bottom — Laranja accent */}
      <footer className="flex justify-center border-t border-[var(--color-border)] bg-[var(--color-background)] py-8">
        <Turtle className="h-12 w-16 text-[var(--color-primary)] sm:h-14 sm:w-20" />
      </footer>
    </div>
  );
}
