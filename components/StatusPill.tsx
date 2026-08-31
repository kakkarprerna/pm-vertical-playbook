import type { ChecklistStatus } from "@/lib/types";

const LABELS: Record<ChecklistStatus, string> = {
  not_started: "Not started",
  learning: "Learning",
  applied: "Applied",
  shipped: "Shipped",
};

const STYLES: Record<ChecklistStatus, string> = {
  not_started: "bg-graphite/5 text-graphite/50 border-graphite/15",
  learning: "bg-amber-50 text-amber-800 border-amber-300",
  applied: "bg-teal-50 text-teal-800 border-teal-300",
  shipped: "bg-graphite text-paper border-graphite",
};

export default function StatusPill({ status }: { status: ChecklistStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
