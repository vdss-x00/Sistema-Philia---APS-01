import supabase from "../config/supabase.js";

async function findAll() {
  const { data, error } = await supabase.from("organizers").select("*");

  if (error) {
    throw error;
  }

  return data;
}

async function create(organizer: {
  organizer_id: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
}) {
  const { data, error } = await supabase
  .from("organizers")
  .insert(organizer)
  .select()
  .single();

  if (error) {
    throw error;
  }

  return data;
}

export default {
  findAll,
  create,
};