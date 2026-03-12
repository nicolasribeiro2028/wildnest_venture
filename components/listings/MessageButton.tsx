import { startConversationAction } from "@/app/actions/messages";

interface MessageButtonProps {
  listingId: string;
}

export function MessageButton({ listingId }: MessageButtonProps) {
  return (
    <form action={startConversationAction}>
      <input type="hidden" name="listingId" value={listingId} />
      <button
        type="submit"
        className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600"
      >
        Message
      </button>
    </form>
  );
}
