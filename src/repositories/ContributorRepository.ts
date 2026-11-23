import supabase from "../config/supabase.js";
import { Contributor } from "../models/Contributor.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function findAll() {
  const { data, error } = await supabase.from("contributors").select("*");

  if (error) {
    throw error;
  }

  return data;
}

async function findById(id: string): Promise<Contributor> {
  const { data, error } = await supabase
    .from("contributors")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new NotFoundError("Contributor not found");
  }

  return Contributor.restore(
    data.id,
    data.name,
    data.active,
    data.description ?? undefined,
    data.icon ?? undefined,
    data.created_at ? new Date(data.created_at) : undefined,
    data.is_deleted,
    Number(data.donation_amount),
  );
}


async function create(contributor: Contributor) {
  const { data, error } = await supabase
    .from("contributors")
    .insert({
      name: contributor.getName(),
      description: contributor.getDescription(),
      icon: contributor.getIcon(),
      donation_amount: contributor.getDonationAmount(),
      active: contributor.isActive(),
      is_deleted: contributor.isDeleted(),
    })
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new NotFoundError("Contributor not found");
  }

  return data;
}

async function update(contributor: Contributor) {
  const id = contributor.getId();

  if (!id) {
    throw new Error("Contributor sem ID não pode ser atualizado.")
  }

  const { data, error } = await supabase
    .from("contributors")
    .update({
      name: contributor.getName(),
      description: contributor.getDescription(),
      icon: contributor.getIcon(),
      donation_amount: contributor.getDonationAmount(),
      active: contributor.isActive(),
      is_deleted: contributor.isDeleted(),
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data){
    throw new NotFoundError("Contributor não encontrado.");
  }

  return data;
}

async function disable(id: string) {
  const { data, error } = await supabase
    .from("contributors")
    .update({ active: false, is_deleted: true })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new NotFoundError("Contributor não encontrado.");
  }

  return data;
}

export default{
    findAll,
    findById,
    create,
    update,
    disable
}









