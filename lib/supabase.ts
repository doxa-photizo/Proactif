import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client for the Next.js frontend.
 * Used exclusively for authentication (sign in / sign out / session management).
 * All gallery data operations go through the FastAPI backend.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Returns the current session's access token, or null if not signed in. */
export async function getAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}
