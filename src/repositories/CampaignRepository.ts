import supabase from "../config/supabase.js";
import { Campaign } from "../models/Campaign.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function findAll() {
  const { data, error } = await supabase.from("campaigns").select("*");

  if (error) {
    throw error;
  }

  return data;
}

async function findById(id: string): Promise<Campaign> {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new NotFoundError("Campanha não encontrada.");
  }

  return Campaign.restore(
    data.id,
    data.organizer_id,
    data.title,
    data.goal_amount,
    data.active,
    data.description,
    data.image,
    data.created_at,
    data.updated_at,
  );
}

async function create(campaign: Campaign) {
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      organizer_id: campaign.getOrganizerId(),
      title: campaign.getTitle(),
      description: campaign.getDescription(),
      image: campaign.getImage(),
      goal_amount: campaign.getGoalAmount(),
      active: campaign.isActive(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function update(campaign: Campaign) {
  const id = campaign.getId();

  if (!id) {
    throw new Error("Campanha sem ID não pode ser atualizada.")
  }

  const { data, error } = await supabase
    .from("campaigns")
    .update({
      organizer_id: campaign.getOrganizerId(),
      title: campaign.getTitle(),
      description: campaign.getDescription(),
      image: campaign.getImage(),
      goal_amount: campaign.getGoalAmount(),
      active: campaign.isActive(),
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data){
    throw new NotFoundError("Campanha não encontrada.");
  }

  return data;
}

async function deactivate(id: string) {
  const { data, error } = await supabase
    .from("campaigns")
    .update({ active: false, is_deleted: true })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new NotFoundError("Campanha não encontrada.");
  }

  return data;
}

async function findByKeyword(keyword: string) {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`);

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
  deactivate,
  findByKeyword,
};