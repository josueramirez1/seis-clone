import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//sign up with email/password
export async function signUp(email, password) {
  return await supabase.auth.signUp({ email, password });
}

// sign in with email/password
export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

//sign out
export async function signOut(error) {
  return await supabase.auth.signOut();
}

//fetch data
export async function fetchCaseload(email) {
  return await supabase.from("swd").select("*").eq("teacher_email", email);
}

//fetch student clicked on
export async function fetchStudent(id) {
  return await supabase.from("swd").select("*").eq("id", id);
}
