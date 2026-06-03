import { supabase } from "@/lib/supabase";

export async function saveItemToSupabase({
  userEmail,
  type,
  title,
  content,
}: {
  userEmail: string;
  type: "idea" | "script" | "hook" | "audit" | "competitor";
  title: string;
  content: string;
}) {

const { data: existing } = await supabase
  .from("saved_items")
  .select("id")
  .eq("user_email", userEmail)
  .eq("type", type)
  .eq("title", title)
  .limit(1);

if (existing && existing.length > 0) {
  alert("Already saved");
  return false;
}

  const { error } = await supabase.from("saved_items").insert({
    user_email: userEmail,
    type,
    title,
    content,
  });

  if (error) {
    console.error("Save history error:", error);
    return false;
  }

  return true;
}

export async function getSavedItems(userEmail: string) {
  const { data, error } = await supabase
    .from("saved_items")
    .select("*")
    .eq("user_email", userEmail)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Get saved items error:", error);
    return [];
  }

  return data || [];
}

export async function deleteSavedItem(id: string) {
  const { error } = await supabase
    .from("saved_items")
    .delete()
    .eq("id", id);

  return !error;
}