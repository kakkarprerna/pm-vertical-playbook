import { getSupabaseClient } from "@/lib/supabaseClient";
import RouteMap from "@/components/RouteMap";
import type { ChecklistItem, LifecycleStage, Vertical } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = getSupabaseClient();
  const [
    { data: verticals, error: verticalsError },
    { data: stages },
    { data: checklistItems },
  ] = await Promise.all([
    supabase.from("verticals").select("*").order("name"),
    supabase.from("lifecycle_stages").select("*").order("order"),
    supabase.from("checklist_items").select("*"),
  ]);

  const v = (verticals ?? []) as Vertical[];
  const s = (stages ?? []) as LifecycleStage[];
  const items = (checklistItems ?? []) as ChecklistItem[];

  const progress: Record<string, Record<string, number>> = {};
  for (const vertical of v) {
    progress[vertical.id] = {};
    for (const stage of s) {
      const cellItems = items.filter(
        (i) =>
          (i.vertical_id === vertical.id || i.vertical_id === null) &&
          i.stage_id === stage.id
      );
      const shipped = cellItems.filter((i) => i.status === "shipped").length;
      progress[vertical.id][stage.id] = cellItems.length
        ? shipped / cellItems.length
        : 0;
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-16">
        <p className="font-mono text-xs uppercase tracking-widest text-graphite/50">
          PM Vertical Playbook
        </p>
        <h1 className="mt-2 font-display text-3xl font-medium text-graphite">
          Four lines, six stations each.
        </h1>
        <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-graphite/70">
          Each line is a vertical. Each station is a lifecycle stage. Rings
          fill in as checklist items ship.
        </p>
      </header>

      {v.length === 0 ? (
        <div className="font-body text-sm text-graphite/50">
          <p>
            No data yet. Run supabase/schema.sql then supabase/seed.sql
            against your Supabase project, and set your env vars in
            .env.local.
          </p>
          <p className="mt-3 font-mono text-xs text-graphite/40">
            URL configured: {process.env.NEXT_PUBLIC_SUPABASE_URL || "(none)"}
          </p>
          <p className="mt-1 font-mono text-xs text-graphite/40">
            Key prefix:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.slice(0, 20)
              : "(none)"}
            ... (length:{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length ?? 0})
          </p>
          {verticalsError && (
            <p className="mt-2 rounded border border-red-300 bg-red-50 p-3 font-mono text-xs text-red-700">
              Supabase error: {verticalsError.message}
            </p>
          )}
        </div>
      ) : (
        <RouteMap verticals={v} stages={s} progress={progress} />
      )}

      <footer className="mt-20 border-t border-graphite/10 pt-6">
        <a
          href="/toolkit"
          className="font-mono text-xs uppercase tracking-wide text-graphite/60 hover:text-graphite"
        >
          AI toolkit →
        </a>
      </footer>
    </main>
  );
}
