"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseClient } from "./supabaseClient";
import type { ChecklistStatus } from "./types";

export async function updateChecklistStatus(
  itemId: string,
  status: ChecklistStatus,
  verticalSlug: string
) {
  const supabase = getSupabaseClient();
  await supabase.from("checklist_items").update({ status }).eq("id", itemId);
  revalidatePath(`/verticals/${verticalSlug}`);
  revalidatePath("/");
}

export async function addEvidence(
  itemId: string,
  type: "link" | "note" | "repo" | "writeup",
  content: string,
  verticalSlug: string
) {
  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from("evidence_entries")
    .insert({ checklist_item_id: itemId, type, content })
    .select()
    .single();

  if (data) {
    await supabase
      .from("checklist_items")
      .update({ evidence_id: data.id })
      .eq("id", itemId);
  }
  revalidatePath(`/verticals/${verticalSlug}`);
}

export async function generatePortfolioCaseStudy(
  verticalId: string,
  verticalSlug: string
) {
  const supabase = getSupabaseClient();
  const { data: shipped } = await supabase
    .from("checklist_items")
    .select("id")
    .eq("vertical_id", verticalId)
    .eq("status", "shipped");

  const ids = (shipped ?? []).map((i) => i.id);

  await supabase.from("portfolio_case_studies").insert({
    vertical_id: verticalId,
    title: `${verticalSlug} case study — draft`,
    checklist_item_ids: ids,
    status: "draft",
  });

  revalidatePath(`/portfolio/${verticalSlug}`);
}
