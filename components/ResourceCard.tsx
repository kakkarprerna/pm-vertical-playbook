import type { ResourceItem } from "@/lib/types";

export default function ResourceCard({ resource }: { resource: ResourceItem }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg border border-graphite/15 bg-white/60 p-4 transition hover:border-graphite/40 hover:bg-white"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-body text-sm font-semibold text-graphite">
          {resource.title}
        </h3>
        <span className="shrink-0 rounded-full border border-graphite/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-graphite/60">
          {resource.type}
        </span>
      </div>
      <p className="mt-1 font-mono text-[11px] text-graphite/50">
        {resource.source}
      </p>
      {resource.notes && (
        <p className="mt-2 font-body text-xs leading-relaxed text-graphite/70">
          {resource.notes}
        </p>
      )}
    </a>
  );
}
