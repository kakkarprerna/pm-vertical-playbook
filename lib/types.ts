export type LifecycleStageSlug =
  | "discovery"
  | "definition"
  | "build"
  | "launch"
  | "growth"
  | "sunset";

export type VerticalSlug =
  | "conversational-ai"
  | "api-analytics-saas"
  | "insurtech"
  | "hr-tech";

export type ChecklistStatus =
  | "not_started"
  | "learning"
  | "applied"
  | "shipped";

export type ResourceType =
  | "course"
  | "certification"
  | "article"
  | "framework"
  | "tool"
  | "community";

export interface Vertical {
  id: string;
  name: string;
  slug: VerticalSlug;
  description: string;
  accent: string; // maps to a tailwind line.* colour
}

export interface LifecycleStage {
  id: string;
  name: string;
  slug: LifecycleStageSlug;
  order: number;
  description: string;
}

export interface ResourceItem {
  id: string;
  vertical_id: string | null; // null = cross-cutting
  stage_id: string | null; // null = applies across all stages
  title: string;
  type: ResourceType;
  url: string;
  source: string;
  added_date: string;
  notes: string | null;
}

export interface ChecklistItem {
  id: string;
  vertical_id: string;
  stage_id: string;
  title: string;
  description: string | null;
  is_starter_item: boolean;
  status: ChecklistStatus;
  evidence_id: string | null;
}

export interface EvidenceEntry {
  id: string;
  checklist_item_id: string;
  type: "link" | "note" | "repo" | "writeup";
  content: string;
  date_logged: string;
}

export interface ToolkitEntry {
  id: string;
  name: string;
  category: string;
  best_for: string;
  stage_ids: string[];
  url: string;
}

export interface PortfolioCaseStudy {
  id: string;
  vertical_id: string;
  title: string;
  summary: string | null;
  checklist_item_ids: string[];
  status: "draft" | "published";
  published_date: string | null;
}
