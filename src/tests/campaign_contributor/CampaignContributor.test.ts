import { describe, expect, it } from "vitest";
import { CampaignContributor } from "../../models/CampaignContributor.js";

const campaignId = "44ec31af-a216-4b49-a112-e51e3187378c";
const contributorId = "6f3b3f1d-c986-4e9d-a5ae-2518cf9ecf1a";

describe("CampaignContributor - Testes unitários", () => {
  it("deve criar uma relação válida entre campanha e contribuidor", () => {
    const relationship = new CampaignContributor(
      campaignId,
      contributorId,
      25.5,
    );

    expect(relationship.getCampaignId()).toBe(campaignId);
    expect(relationship.getContributorId()).toBe(contributorId);
    expect(relationship.getDonationAmount()).toBe(25.5);
    expect(relationship.getCreatedAt()).toBeUndefined();
  });

  it("não deve aceitar identificadores inválidos", () => {
    expect(
      () => new CampaignContributor("campanha-invalida", contributorId, 10),
    ).toThrow("O identificador deve ser um UUID válido.");
    expect(
      () => new CampaignContributor(campaignId, "contribuidor-invalido", 10),
    ).toThrow("O identificador deve ser um UUID válido.");
  });

  it("não deve aceitar valores monetários inválidos", () => {
    expect(
      () => new CampaignContributor(campaignId, contributorId, -1),
    ).toThrow(
      "O valor da contribuição deve ser válido e possuir no máximo duas casas decimais.",
    );
    expect(
      () => new CampaignContributor(campaignId, contributorId, 10.001),
    ).toThrow(
      "O valor da contribuição deve ser válido e possuir no máximo duas casas decimais.",
    );
  });

  it("deve restaurar uma relação persistida", () => {
    const createdAt = new Date("2026-01-01T00:00:00.000Z");
    const relationship = CampaignContributor.restore(
      campaignId,
      contributorId,
      100,
      createdAt,
    );

    expect(relationship.getCampaignId()).toBe(campaignId);
    expect(relationship.getContributorId()).toBe(contributorId);
    expect(relationship.getDonationAmount()).toBe(100);
    expect(relationship.getCreatedAt()).toBe(createdAt);
  });
});
