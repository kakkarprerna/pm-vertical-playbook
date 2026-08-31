import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";
import type { LifecycleStage, ToolkitEntry } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ToolkitPage() {
  const supabase = getSupabaseClient();
  const [{ data: stages }, { data: toolkit }] = await Promise.all([
    supabase.from("lifecycle_stages").select("*").order("order"),
    supabase.from("toolkit_entries").select("*"),
  ]);

  const s = (stages ?? []) as LifecycleStage[];
  const tools = (toolkit ?? []) as ToolkitEntry[];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-wide text-graphite/50 hover:text-graphite"
      >
        ← Dashboard
      </Link>
      <h1 className="mt-3 font-display text-3xl font-medium text-graphite">
        AI Toolkit
      </h1>
      <p className="mt-2 max-w-xl font-body text-sm text-graphite/70">
        Cross-cutting tools, mapped to the stage they earn their keep in
        rather than to any one vertical.
      </p>

      <div className="mt-12 space-y-10">
        {s.map((stage) => {
          const stageTools = tools.filter((t) =>
            t.stage_ids.includes(stage.id)
          );
          if (stageTools.length === 0) return null;
          return (
            <section key={stage.id}>
              <h2 className="mb-3 font-display text-lg font-medium text-graphite">
                {stage.name}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {stageTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-graphite/15 bg-white/60 p-4 transition hover:border-graphite/40 hover:bg-white"
                  >
                    <p className="font-body text-sm font-semibold text-graphite">
                      {tool.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-graphite/50">
                      {tool.category}
                    </p>
                    <p className="mt-2 font-body text-xs text-graphite/70">
                      {tool.best_for}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
