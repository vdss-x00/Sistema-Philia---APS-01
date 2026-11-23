import supabase from "../config/supabase.js";
import { CampaignContributor } from "../models/CampaignContributor.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function findAll() {
  const { data, error } = await supabase.from("campaign_contributors").select("*");

  if (error) {
    throw error;
  }

  return data;
}

async function findById(campaign_id: string, contributor_id: string): Promise<CampaignContributor> {
  const { data, error } = await supabase
    .from("campaign_contributors")
    .select("*")
    .eq("campaign_id", campaign_id)
    .eq("contributor_id", contributor_id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new NotFoundError("Contributions not found");
  }

  return CampaignContributor.restore(
    data.campaign_id,
    data.contributor_id,
    Number(data.donation_amount),
    data.created_at ? new Date(data.created_at) : undefined,
  );
}


async function create(campaign_contributor: CampaignContributor) {
  const { data, error } = await supabase
    .from("campaign_contributors")
    .insert({
      campaign_id: campaign_contributor.getCampaignId(),
      contributor_id: campaign_contributor.getContributorId(),
      donation_amount: campaign_contributor.getDonationAmount(),
    })
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new NotFoundError("Contributions not found");
  }

  return data;
}

async function update(campaign_contributor: CampaignContributor) {
  const campaign_id = campaign_contributor.getCampaignId();
  const contributor_id = campaign_contributor.getContributorId();

  if (!campaign_id) {
    throw new Error("Contribuição sem ID de campanha não pode ser atualizada.")
  }

  if (!contributor_id) {
    throw new Error("Contribuição sem ID de contribuidor não pode ser atualizada.")
  }

  const { data, error } = await supabase
    .from("campaign_contributors")
    .update({
      donation_amount: campaign_contributor.getDonationAmount(),
    })
    .eq("campaign_id", campaign_contributor.getCampaignId())
    .eq("contributor_id", campaign_contributor.getContributorId())
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data){
    throw new NotFoundError("Contribuição não encontrada.");
  }

  return data;
}


export default{
    findAll,
    findById,
    create,
    update
}









