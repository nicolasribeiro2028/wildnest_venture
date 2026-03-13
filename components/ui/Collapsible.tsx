"use client";

import { useState } from "react";

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: string;
}

export function Collapsible({
  title,
  defaultOpen = false,
  children,
  badge,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-[#F2E9DC]/60"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#2E2E2E]">{title}</span>
          {badge && (
            <span className="rounded-full bg-[#F59E42]/15 px-2 py-0.5 text-xs font-semibold text-[#F59E42]">
              {badge}
            </span>
          )}
        </div>
        <span
          className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && <div className="border-t border-[#E5E5E5] px-5 py-5">{children}</div>}
    </div>
  );
}
