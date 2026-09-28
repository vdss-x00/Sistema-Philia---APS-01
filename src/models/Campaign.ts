import supabase from "../config/supabase.js";

async function findAll() {
  const { data, error } = await supabase.from("campaigns").select("*");

  if (error) {
    throw error;
  }

  return data;
}

async function findById(id: string) {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function create(campaign: {
  name: string;
  description: string;
  icon: string;
  goal_amount: number;
  active: boolean;
}) {
  const { data, error } = await supabase
    .from("categories")
    .insert(campaign)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function update(
  id: string,
  campaign: {
    name: string;
    description: string;
    icon: string;
    goal_amount: number;
    active: boolean;
  },
) {
  const { data, error } = await supabase
    .from("campaigns")
    .update(campaign)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function remove(id: string) {
  const { data, error } = await supabase
    .from("campaigns")
    .delete()
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
  findById,
  create,
  update,
  remove,
};
