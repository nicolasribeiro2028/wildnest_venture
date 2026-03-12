import Link from "next/link";
import { getConversations } from "@/app/actions/messages";

export default async function MessagesPage() {
  const conversations = await getConversations();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Messages
      </h1>

      {conversations.length === 0 ? (
        <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400">
            No conversations yet.
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
            Message a lister from a listing page to start a conversation.
          </p>
          <Link
            href="/listings"
            className="mt-4 inline-block font-medium text-amber-600 hover:text-amber-700"
          >
            Browse listings
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {conversations.map((c) => (
            <li key={c.id}>
              <Link
                href={`/messages/${c.id}`}
                className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-amber-300 hover:bg-amber-50/50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-amber-600 dark:hover:bg-amber-950/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-100">
                      {c.listing.title}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      with {c.otherParty}
                    </p>
                    {c.lastMessage && (
                      <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
                        {c.lastMessage.body}
                      </p>
                    )}
                  </div>
                  {c.lastMessage && (
                    <span className="shrink-0 text-xs text-zinc-400">
                      {formatRelativeTime(c.lastMessage.createdAt)}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
