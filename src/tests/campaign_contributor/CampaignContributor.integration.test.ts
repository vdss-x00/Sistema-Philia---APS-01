import { randomUUID } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import supabase from "../../config/supabase.js";
import { CampaignContributor } from "../../models/CampaignContributor.js";

describe("CampaignContributor - Testes de integração", () => {
  let organizerId: string | undefined;
  let campaignId: string | undefined;
  let contributorId: string | undefined;

  afterEach(async () => {
    const cleanupErrors: string[] = [];

    if (campaignId && contributorId) {
      const { error } = await supabase
        .from("campaign_contributors")
        .delete()
        .eq("campaign_id", campaignId)
        .eq("contributor_id", contributorId);

      if (error) cleanupErrors.push(error.message);
    }

    if (contributorId) {
      const { error } = await supabase
        .from("contributors")
        .delete()
        .eq("id", contributorId);

      if (error) cleanupErrors.push(error.message);
    }

    if (campaignId) {
      const { error } = await supabase
        .from("campaigns")
        .delete()
        .eq("id", campaignId);

      if (error) cleanupErrors.push(error.message);
    }

    if (organizerId) {
      const { error } = await supabase
        .from("organizers")
        .delete()
        .eq("id", organizerId);

      if (error) cleanupErrors.push(error.message);
    }

    organizerId = undefined;
    campaignId = undefined;
    contributorId = undefined;

    if (cleanupErrors.length > 0) {
      throw new Error(
        `Falha ao limpar dados da relação de contribuição: ${cleanupErrors.join("; ")}`,
      );
    }
  });

  it("deve persistir uma relação de contribuição entre campanha e contribuidor", async () => {
    const organizerResult = await supabase
      .from("organizers")
      .insert({
        name: `Organizador relação ${randomUUID()}`,
        active: true,
      })
      .select("id")
      .single();

    if (organizerResult.error) {
      throw new Error(
        `Falha ao criar organizador do teste: ${organizerResult.error.message}`,
      );
    }

    organizerId = organizerResult.data.id;

    const campaignResult = await supabase
      .from("campaigns")
      .insert({
        organizer_id: organizerId,
        title: `Campanha relação ${randomUUID()}`,
        goal_amount: 100,
      })
      .select("id")
      .single();

    if (campaignResult.error) {
      throw new Error(
        `Falha ao criar campanha do teste: ${campaignResult.error.message}`,
      );
    }

    const createdCampaignId = campaignResult.data.id;
    campaignId = createdCampaignId;

    const contributorResult = await supabase
      .from("contributors")
      .insert({
        name: `Contribuidor relação ${randomUUID()}`,
        donation_amount: 25,
        active: true,
      })
      .select("id")
      .single();

    if (contributorResult.error) {
      throw new Error(
        `Falha ao criar contribuidor do teste: ${contributorResult.error.message}`,
      );
    }

    const createdContributorId = contributorResult.data.id;
    contributorId = createdContributorId;

    const relationship = new CampaignContributor(
      createdCampaignId,
      createdContributorId,
      25,
    );
    const relationshipResult = await supabase
      .from("campaign_contributors")
      .insert({
        campaign_id: relationship.getCampaignId(),
        contributor_id: relationship.getContributorId(),
        donation_amount: relationship.getDonationAmount(),
      })
      .select()
      .single();

    if (relationshipResult.error) {
      throw new Error(
        `Falha ao criar relação de contribuição: ${relationshipResult.error.message}`,
      );
    }

    expect(relationshipResult.data).toMatchObject({
      campaign_id: campaignId,
      contributor_id: contributorId,
    });
    expect(Number(relationshipResult.data.donation_amount)).toBe(25);
  });
});
