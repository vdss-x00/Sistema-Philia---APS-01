import { describe, expect, it } from "vitest";
import { Campaign } from "../../models/Campaign.js";

const organizerId = "44ec31af-a216-4b49-a112-e51e3187378c";

describe("Campaign - Testes unitários", () => {
  it("deve criar uma campanha válida", () => {
    const campaign = new Campaign(
      organizerId,
      "Campanha de Teste",
      1000,
      "Descrição da campanha de teste",
      "https://example.com/image.jpg",
    );

    expect(campaign.getOrganizerId()).toBe(organizerId);
    expect(campaign.getTitle()).toBe("Campanha de Teste");
    expect(campaign.getGoalAmount()).toBe(1000);
    expect(campaign.getDescription()).toBe("Descrição da campanha de teste");
    expect(campaign.getImage()).toBe("https://example.com/image.jpg");
    expect(campaign.isActive()).toBe(true);
    expect(campaign.getId()).toBeUndefined();
  });

  it("não deve permitir criar uma campanha sem título", () => {
    expect(
      () => new Campaign(organizerId, "   ", 1000),
    ).toThrow("O título da campanha é obrigatório.");
  });

  it("deve remover espaços antes e depois do título", () => {
    const campaign = new Campaign(organizerId, "  Campanha Solidária  ", 1000);

    expect(campaign.getTitle()).toBe("Campanha Solidária");
  });

  it("não deve permitir título com mais de 150 caracteres", () => {
    expect(
      () => new Campaign(organizerId, "a".repeat(151), 1000),
    ).toThrow("O título deve ter no máximo 150 caracteres.");
  });

  it("não deve permitir um identificador de organizador inválido", () => {
    expect(
      () => new Campaign("organizador-invalido", "Campanha", 1000),
    ).toThrow("O identificador do organizador deve ser um UUID válido.");
  });

  it("não deve permitir meta negativa ou com mais de duas casas decimais", () => {
    expect(
      () => new Campaign(organizerId, "Campanha", -1),
    ).toThrow(
      "A meta da campanha deve ser um valor monetário válido e maior ou igual a zero, com no máximo duas casas decimais.",
    );

    expect(
      () => new Campaign(organizerId, "Campanha", 10.001),
    ).toThrow(
      "A meta da campanha deve ser um valor monetário válido e maior ou igual a zero, com no máximo duas casas decimais.",
    );
  });

  it("deve permitir alterar os dados de uma campanha existente", () => {
    const campaign = new Campaign(
      organizerId,
      "Campanha Original",
      1000,
      "Descrição original",
      "original.jpg",
    );

    campaign.rename("Campanha Atualizada");
    campaign.changeDescription("Nova descrição");
    campaign.changeImage("nova.jpg");
    campaign.changeGoalAmount(2500.5);

    expect(campaign.getTitle()).toBe("Campanha Atualizada");
    expect(campaign.getDescription()).toBe("Nova descrição");
    expect(campaign.getImage()).toBe("nova.jpg");
    expect(campaign.getGoalAmount()).toBe(2500.5);
  });

  it("deve desativar e reativar uma campanha", () => {
    const campaign = new Campaign(organizerId, "Campanha", 1000);

    campaign.deactivate();
    expect(campaign.isActive()).toBe(false);

    campaign.activate();
    expect(campaign.isActive()).toBe(true);
  });

  it("deve restaurar uma campanha existente", () => {
    const campaignId = "6f3b3f1d-c986-4e9d-a5ae-2518cf9ecf1a";
    const createdAt = new Date("2026-01-01T00:00:00.000Z");
    const updatedAt = new Date("2026-01-02T00:00:00.000Z");

    const campaign = Campaign.restore(
      campaignId,
      organizerId,
      "Campanha Restaurada",
      5000,
      false,
      "Descrição restaurada",
      "restaurada.jpg",
      createdAt,
      updatedAt,
    );

    expect(campaign.getId()).toBe(campaignId);
    expect(campaign.getOrganizerId()).toBe(organizerId);
    expect(campaign.getTitle()).toBe("Campanha Restaurada");
    expect(campaign.getGoalAmount()).toBe(5000);
    expect(campaign.isActive()).toBe(false);
    expect(campaign.getDescription()).toBe("Descrição restaurada");
    expect(campaign.getImage()).toBe("restaurada.jpg");
    expect(campaign.getCreatedAt()).toBe(createdAt);
    expect(campaign.getUpdatedAt()).toBe(updatedAt);
  });
});
