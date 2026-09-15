"use client";

import { useTransition } from "react";
import type { ChecklistItem, ChecklistStatus } from "@/lib/types";
import { updateChecklistStatus } from "@/lib/actions";
import StatusPill from "./StatusPill";

const STATUS_CYCLE: ChecklistStatus[] = [
  "not_started",
  "learning",
  "applied",
  "shipped",
];

export default function ChecklistItemRow({
  item,
  verticalSlug,
}: {
  item: ChecklistItem;
  verticalSlug: string;
}) {
  const [isPending, startTransition] = useTransition();

  function advance() {
    const currentIndex = STATUS_CYCLE.indexOf(item.status);
    const next = STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length];
    startTransition(() => {
      updateChecklistStatus(item.id, next, verticalSlug);
    });
  }

  return (
    <li className="flex items-center justify-between gap-3 border-b border-graphite/10 py-2.5 last:border-none">
      <span className="flex items-center gap-2">
        {item.tag && (
          <span className="shrink-0 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-indigo-700">
            {item.tag}
          </span>
        )}
        <span className="font-body text-sm text-graphite">{item.title}</span>
      </span>
      <button
        onClick={advance}
        disabled={isPending}
        className="shrink-0 disabled:opacity-50"
        aria-label={`Advance status for ${item.title}`}
      >
        <StatusPill status={item.status} />
      </button>
    </li>
  );
}
