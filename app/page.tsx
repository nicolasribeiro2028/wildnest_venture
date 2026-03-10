import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { Turtle } from "@/components/landing";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      {/* Bauhaus-style hero block */}
      <header className="border-b-4 border-[var(--bauhaus-purple)] bg-[var(--bauhaus-green)] px-6 py-8 text-white">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Aparturtle
        </h1>
        <p className="mt-2 text-lg opacity-95">
          Student housing — summer & year-long
        </p>
      </header>

      <main className="flex flex-1 flex-col items-center gap-10 px-6 py-12">
        {/* Info block — geometric, bold */}
        <section
          className="w-full max-w-2xl border-4 border-[var(--bauhaus-purple)] bg-[var(--bauhaus-purple)] px-8 py-12 text-center text-white"
          aria-label="Coming soon"
        >
          <p className="text-2xl font-bold uppercase tracking-wide sm:text-3xl">
            More info soon
          </p>
        </section>

        {/* CTAs: Sign in / Sign up */}
        <section className="flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/login" variant="primary" className="min-w-[140px] px-6 py-3">
            Sign in
          </ButtonLink>
          <ButtonLink href="/signup" variant="secondary" className="min-w-[140px] px-6 py-3">
            Sign up
          </ButtonLink>
        </section>

        {/* Search engine entry */}
        <Link
          href="/search"
          className="border-2 border-[var(--bauhaus-neutral)] px-6 py-3 font-semibold text-[var(--bauhaus-neutral)] transition-colors hover:bg-[var(--bauhaus-neutral)] hover:text-[var(--background)]"
        >
          Check the search engine
        </Link>
      </main>

      {/* Turtle at bottom — brand resemblance */}
      <footer className="flex justify-center border-t-2 border-[var(--bauhaus-muted)] bg-[var(--background)] py-8">
        <Turtle className="h-12 w-16 text-[var(--bauhaus-green)] sm:h-14 sm:w-20" />
      </footer>
    </div>
  );
}
