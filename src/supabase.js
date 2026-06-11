import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sgckicfwubppffqkjicz.supabase.co";

const supabaseAnonKey =
  "sb_publishable_zQFVgFZUpgZK3D08Xn3MAQ_bU-pfGtU";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

console.log("Supabase Key:", supabaseAnonKey.substring(0, 20));