import { notFound } from "next/navigation";
import Link from "next/link";
import { getThread } from "@/app/actions/messages";
import { getCurrentUserId } from "@/app/lib/auth";
import { MessageForm } from "@/components/messages/MessageForm";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = await getCurrentUserId();
  if (!userId) notFound();

  const thread = await getThread(id);
  if (!thread) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/messages"
        className="mb-6 inline-block text-sm text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← Back to messages
      </Link>

      <div className="mb-6 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-800">
        <Link
          href={`/listings/${thread.listing.id}`}
          className="font-medium text-amber-600 hover:text-amber-700"
        >
          {thread.listing.title}
        </Link>
      </div>

      <div className="space-y-4">
        {thread.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderUserId === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.senderUserId === userId
                  ? "bg-amber-500 text-white"
                  : "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100"
              }`}
            >
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {`${msg.sender.firstName} ${msg.sender.lastName}`}
              </p>
              <p className="mt-1">{msg.body}</p>
              <p className="mt-1 text-xs opacity-75">
                {msg.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <MessageForm conversationId={id} />
      </div>
    </div>
  );
}
