import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Warning: Supabase URL or Anon Key is missing in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
