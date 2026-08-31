import { createClient } from "@supabase/supabase-js";

// A factory instead of a module-level singleton. Server Components in this
// app already fetch fresh per request (dynamic = "force-dynamic"), so
// there's no caching benefit to a shared client, and a factory avoids any
// risk of a stale client surviving a hot reload with old env values.
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase env vars are missing. Copy .env.local.example to .env.local and fill in your project's URL and anon/publishable key."
    );
  }

  return createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");
}
