import Link from "next/link";
import type { LifecycleStage, Vertical } from "@/lib/types";

const LINE_CLASSES: Record<string, string> = {
  conversational: "bg-line-conversational border-line-conversational",
  api: "bg-line-api border-line-api",
  insurtech: "bg-line-insurtech border-line-insurtech",
  hrtech: "bg-line-hrtech border-line-hrtech",
};

const TEXT_CLASSES: Record<string, string> = {
  conversational: "text-line-conversational",
  api: "text-line-api",
  insurtech: "text-line-insurtech",
  hrtech: "text-line-hrtech",
};

// The signature element: each vertical is a coloured line running through
// six stations (the lifecycle stages). Station fill = share of that stage's
// checklist marked Shipped.
export default function RouteMap({
  verticals,
  stages,
  progress,
}: {
  verticals: Vertical[];
  stages: LifecycleStage[];
  progress: Record<string, Record<string, number>>;
}) {
  const gridCols = `10rem repeat(${stages.length}, 1fr)`;

  return (
    <div className="space-y-10">
      <div className="grid items-end" style={{ gridTemplateColumns: gridCols }}>
        <div />
        {stages.map((stage) => (
          <div key={stage.id} className="px-2 text-center">
            <p className="font-mono text-[10px] uppercase tracking-wider text-graphite/40">
              {String(stage.order).padStart(2, "0")}
            </p>
            <p className="font-body text-xs font-medium text-graphite/80">
              {stage.name}
            </p>
          </div>
        ))}
      </div>

      {verticals.map((vertical) => (
        <Link
          key={vertical.id}
          href={`/verticals/${vertical.slug}`}
          className="grid items-center"
          style={{ gridTemplateColumns: gridCols }}
        >
          <span
            className={`font-body text-sm font-semibold ${TEXT_CLASSES[vertical.accent]}`}
          >
            {vertical.name}
          </span>

          {stages.map((stage) => {
            const ratio = progress[vertical.id]?.[stage.id] ?? 0;
            return (
              <div key={stage.id} className="relative flex h-6 items-center justify-center">
                <span
                  className={`absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 ${LINE_CLASSES[vertical.accent]} opacity-25`}
                />
                <span
                  className={`relative h-4 w-4 rounded-full border-2 bg-paper ${LINE_CLASSES[vertical.accent]}`}
                  style={{ opacity: 0.3 + ratio * 0.7 }}
                  title={`${Math.round(ratio * 100)}% shipped`}
                />
              </div>
            );
          })}
        </Link>
      ))}
    </div>
  );
}
