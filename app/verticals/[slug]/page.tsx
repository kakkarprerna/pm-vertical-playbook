import { notFound } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabaseClient";
import ChecklistItemRow from "@/components/ChecklistItemRow";
import ResourceCard from "@/components/ResourceCard";
import type {
  ChecklistItem,
  LifecycleStage,
  ResourceItem,
  Vertical,
} from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function VerticalPage({
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

  const [{ data: stages }, { data: checklistItems }, { data: resources }] =
    await Promise.all([
      supabase.from("lifecycle_stages").select("*").order("order"),
      supabase.from("checklist_items").select("*").eq("vertical_id", v.id),
      supabase
        .from("resource_items")
        .select("*")
        .or(`vertical_id.eq.${v.id},vertical_id.is.null`),
    ]);

  const s = (stages ?? []) as LifecycleStage[];
  const items = (checklistItems ?? []) as ChecklistItem[];
  const res = (resources ?? []) as ResourceItem[];

  const verticalResources = res.filter((r) => r.vertical_id === v.id);
  const crossFunctionalResources = res.filter((r) => r.vertical_id === null);

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-wide text-graphite/50 hover:text-graphite"
      >
        ← All verticals
      </Link>
      <h1 className="mt-3 font-display text-3xl font-medium text-graphite">
        {v.name}
      </h1>
      <p className="mt-2 max-w-xl font-body text-sm text-graphite/70">
        {v.description}
      </p>
      <Link
        href={`/portfolio/${v.slug}`}
        className="mt-4 inline-block font-mono text-xs uppercase tracking-wide text-graphite/60 underline hover:text-graphite"
      >
        Compile portfolio case study →
      </Link>

      {verticalResources.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-wide text-graphite/50">
            Resources for this vertical
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {verticalResources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-14 space-y-14">
        {s.map((stage) => {
          const stageItems = items.filter((i) => i.stage_id === stage.id);
          return (
            <section key={stage.id}>
              <div className="mb-3 flex items-baseline gap-3">
                <span className="font-mono text-xs text-graphite/40">
                  {String(stage.order).padStart(2, "0")}
                </span>
                <h2 className="font-display text-lg font-medium text-graphite">
                  {stage.name}
                </h2>
              </div>
              <ul>
                {stageItems.map((item) => (
                  <ChecklistItemRow
                    key={item.id}
                    item={item}
                    verticalSlug={v.slug}
                  />
                ))}
                {stageItems.length === 0 && (
                  <p className="font-body text-sm text-graphite/40">
                    No checklist items yet.
                  </p>
                )}
              </ul>
            </section>
          );
        })}
      </div>

      {crossFunctionalResources.length > 0 && (
        <section className="mt-16 border-t border-graphite/10 pt-8">
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-wide text-graphite/50">
            Cross-functional resources
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {crossFunctionalResources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
