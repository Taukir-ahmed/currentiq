import { createClient } from '@supabase/supabase-js';

// Accessing environment variables in Vite uses import.meta.env 
// instead of the traditional process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);