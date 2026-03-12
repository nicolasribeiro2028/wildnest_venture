"use client";

import { useActionState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendMessageAction } from "@/app/actions/messages";

const initialState: { error?: string; success?: boolean } = {};

interface MessageFormProps {
  conversationId: string;
}

export function MessageForm({ conversationId }: MessageFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const body = (formData.get("body") as string)?.trim() ?? "";
      return sendMessageAction(conversationId, body);
    },
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-2">
      <div className="flex gap-2">
      <textarea
        name="body"
        rows={2}
        required
        placeholder="Type your message..."
        className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white hover:bg-amber-600"
      >
        Send
      </button>
      </div>
      {state?.error && (
        <p className="col-span-full text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
    </form>
  );
}
