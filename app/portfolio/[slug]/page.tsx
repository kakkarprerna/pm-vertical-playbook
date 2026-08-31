import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { generatePortfolioCaseStudy } from "@/lib/actions";
import type {
  ChecklistItem,
  EvidenceEntry,
  LifecycleStage,
  Vertical,
} from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PortfolioPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = getSupabaseClient();
  const { data: vertical } = await supabase
    .from("verticals")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!vertical) notFound();
  const v = vertical as Vertical;

  const [{ data: stages }, { data: shippedItems }] = await Promise.all([
    supabase.from("lifecycle_stages").select("*").order("order"),
    supabase
      .from("checklist_items")
      .select("*")
      .eq("vertical_id", v.id)
      .eq("status", "shipped"),
  ]);

  const s = (stages ?? []) as LifecycleStage[];
  const items = (shippedItems ?? []) as ChecklistItem[];

  const evidenceIds = items
    .map((i) => i.evidence_id)
    .filter((id): id is string => Boolean(id));

  const { data: evidence } = evidenceIds.length
    ? await supabase.from("evidence_entries").select("*").in("id", evidenceIds)
    : { data: [] as EvidenceEntry[] };

  const evidenceById = new Map(
    (evidence ?? []).map((e) => [e.id, e as EvidenceEntry])
  );

  async function compile() {
    "use server";
    await generatePortfolioCaseStudy(v.id, v.slug);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href={`/verticals/${v.slug}`}
        className="font-mono text-xs uppercase tracking-wide text-graphite/50 hover:text-graphite"
      >
        ← {v.name}
      </Link>
      <h1 className="mt-3 font-display text-3xl font-medium text-graphite">
        Portfolio case study
      </h1>
      <p className="mt-2 max-w-xl font-body text-sm text-graphite/70">
        Draft, pulled from everything marked Shipped in {v.name}, grouped by
        stage.
      </p>

      <form action={compile} className="mt-6">
        <button
          type="submit"
          className="rounded-full border border-graphite bg-graphite px-4 py-2 font-mono text-xs uppercase tracking-wide text-paper transition hover:opacity-90"
        >
          Compile draft
        </button>
      </form>

      <div className="mt-12 space-y-10">
        {s.map((stage) => {
          const stageItems = items.filter((i) => i.stage_id === stage.id);
          if (stageItems.length === 0) return null;
          return (
            <section key={stage.id}>
              <h2 className="mb-3 font-display text-lg font-medium text-graphite">
                {stage.name}
              </h2>
              <ul className="space-y-3">
                {stageItems.map((item) => {
                  const ev = item.evidence_id
                    ? evidenceById.get(item.evidence_id)
                    : undefined;
                  return (
                    <li
                      key={item.id}
                      className="rounded-lg border border-graphite/15 bg-white/60 p-4"
                    >
                      <p className="font-body text-sm font-semibold text-graphite">
                        {item.title}
                      </p>
                      {ev && (
                        <p className="mt-2 font-body text-xs text-graphite/70">
                          {ev.content}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
        {items.length === 0 && (
          <p className="font-body text-sm text-graphite/40">
            Nothing marked Shipped yet in this vertical.
          </p>
        )}
      </div>
    </main>
  );
}
