import Link from "next/link";
import { getMySublets } from "@/app/actions/listings";
import { SubletActions } from "@/components/listings/SubletActions";

export default async function MySubletsPage() {
  const sublets = await getMySublets();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          Manage my sublets
        </h1>
        <Link
          href="/listings/new?tag=sublet&returnTo=my-sublets"
          className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600"
        >
          Add sublet
        </Link>
      </div>

      {sublets.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            You haven&apos;t posted any sublets yet.
          </p>
          <Link
            href="/listings/new?tag=sublet&returnTo=my-sublets"
            className="mt-4 inline-block font-medium text-amber-600 hover:text-amber-700"
          >
            Post your first sublet
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {sublets.map((sublet) => (
            <li
              key={sublet.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <Link
                href={`/listings/${sublet.id}`}
                className="min-w-0 flex-1"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {sublet.term}
                  </span>
                </div>
                <h2 className="font-semibold text-zinc-800 dark:text-zinc-100">
                  {sublet.title}
                </h2>
                {sublet.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {sublet.description}
                  </p>
                )}
                {sublet.price && (
                  <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    ${sublet.price}/mo
                  </p>
                )}
              </Link>
              <SubletActions listingId={sublet.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
