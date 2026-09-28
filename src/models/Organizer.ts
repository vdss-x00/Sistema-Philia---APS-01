import supabase from "../config/supabase.js";

async function findAll() {
  const { data, error } = await supabase.from("organizers").select("*");

  if (error) {
    throw error;
  }

  return data;
}

async function findById(id:string) {
  const { data, error } = await supabase
  .from("organizers")
  .select("*")
  .eq("id", id)
  .single();

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

async function update(
  id: string,
  organizer: Partial<{
    name: string;
    description: string;
    icon: string;
    active: boolean;
  }>,
) {
  const { data, error } = await supabase
    .from("organizers")
    .update(organizer)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function disable(id:string) {
  const { data, error } = await supabase
    .from("organizers")
    .update({ active: false })
    .eq("id", id)
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
  findById,
  update,
  disable,
};