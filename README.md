# PM Vertical Playbook

Scaffolded from the spec in `pm-vertical-playbook-spec.md`. Next.js 14 (App
Router) + TypeScript + Tailwind + Supabase.

## What's here

- `app/page.tsx` — dashboard: the route-map view, one line per vertical,
  one station per lifecycle stage, station fill = share shipped
- `app/verticals/[slug]/page.tsx` — vertical detail: resources plus the
  checklist for each of the six stages
- `app/toolkit/page.tsx` — cross-cutting AI toolkit, grouped by stage
- `app/portfolio/[slug]/page.tsx` — compiles a draft case study from
  everything marked Shipped in a vertical
- `lib/actions.ts` — server actions: update checklist status, log
  evidence, compile a portfolio draft
- `lib/types.ts` — TypeScript types matching the data model in the spec
- `supabase/schema.sql` — table definitions
- `supabase/seed.sql` — the four verticals, six stages, curated resources
  (vertical-specific and cross-functional), the AI toolkit, and 48 starter
  checklist items, all pulled from the spec

## Setup

1. Create a Supabase project at supabase.com if you don't have one yet.
2. In the Supabase SQL editor, run `supabase/schema.sql`, then
   `supabase/seed.sql`.
3. Copy `.env.local.example` to `.env.local` and fill in your project's URL
   and anon key (Project Settings → API in Supabase).
4. Install dependencies and run the dev server:

   ```
   npm install
   npm run dev
   ```

5. Open http://localhost:3000

## Notes

- Single-user scope for V1, so there's no auth and RLS is left off in
  `schema.sql`. Add both before putting this behind a public URL.
- Starter checklist items are flagged `is_starter_item = true` in the
  database so you can tell pre-seeded recommendations apart from anything
  you add yourself; editing or deleting them is just a normal row update.
- The design token system: paper background (#F6F5F1), graphite text,
  four accent colours (one per vertical, in `tailwind.config.ts`), Space
  Grotesk for display type, Inter for body, JetBrains Mono for labels and
  figures.
- Next steps once this is running: add your own checklist items as you go,
  and revisit the vertical-specific resource list periodically since
  course/certification offerings shift faster than this file will.
