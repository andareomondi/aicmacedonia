import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * Environment variables are already available in next-lite.
 * We assert non-null here because they are required for Supabase.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Singleton pattern – ensures we only ever have one Supabase client
 * on the client side to avoid duplicated network handlers & listeners.
 */
let _supabase: SupabaseClient | undefined

export function createClient(): SupabaseClient {
  if (!_supabase) {
    _supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

/**
 * Named export so code that does
 * `import { supabase } from "@/lib/supabase-client"`
 * keeps working (e.g. /app/admin/page.tsx).
 */
export const supabase = createClient()
