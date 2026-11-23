import { randomUUID } from "node:crypto";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import supabase from "../../config/supabase.js";

describe("Campaign - Testes de integração", () => {
  const testCampaignIds: string[] = [];
  let organizerId = "";

  beforeAll(async () => {
    const name = `Organizador teste ${randomUUID()}`;
    const { data, error } = await supabase
      .from("organizers")
      .insert({
        name,
        description: "Organizador criado pelo teste de integração",
        icon: "🏢",
        active: true,
      })
      .select("id")
      .single();

    if (error) {
      throw new Error(`Falha ao criar organizador do teste: ${error.message}`);
    }

    organizerId = data.id as string;
  });

  afterAll(async () => {
    if (!organizerId) {
      return;
    }

    const { error } = await supabase
      .from("organizers")
      .delete()
      .eq("id", organizerId);

    if (error) {
      throw new Error(`Falha ao limpar organizador do teste: ${error.message}`);
    }
  });

  function makeCampaignData() {
    const title = `Teste integração ${randomUUID()}`;

    return {
      organizer_id: organizerId,
      title,
      goal_amount: 100,
      description: "Campanha criada pelo teste de integração",
      image: "🎉",
    };
  }

  async function createCampaign() {
    const data = makeCampaignData();

    const response = await request(app).post("/campaigns").send(data);

    if (typeof response.body.id === "string") {
      testCampaignIds.push(response.body.id);
    }

    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(expect.any(String));

    return {
      id: response.body.id as string,
      data,
    };
  }

  afterEach(async () => {
    if (testCampaignIds.length === 0) {
      return;
    }

    const { error } = await supabase
      .from("campaigns")
      .delete()
      .in("id", testCampaignIds);

    testCampaignIds.length = 0;

    if (error) {
      throw new Error(`Falha ao limpar campanhas do teste: ${error.message}`);
    }
  });

  it("deve criar uma campanha válida", async () => {
    const data = makeCampaignData();

    const response = await request(app).post("/campaigns").send(data);

    if (typeof response.body.id === "string") {
      testCampaignIds.push(response.body.id);
    }

    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(expect.any(String));
    expect(response.body).toMatchObject({
      ...data,
      active: true,
    });
  });

  it("deve listar as campanhas inclusive a campanha criada", async () => {
    const { id, data } = await createCampaign();

    const response = await request(app).get("/campaigns");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id,
          title: data.title,
        }),
      ]),
    );
  }, 20_000);

  it("deve consultar uma campanha existente pelo ID", async () => {
    const { id, data } = await createCampaign();

    const response = await request(app).get(`/campaigns/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      ...data,
      active: true,
    });
  }, 20_000);

  it("deve remover uma campanha existente", async () => {
    const { id } = await createCampaign();

    const response = await request(app).delete(`/campaigns/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Campanha removida com sucesso!",
    });
  }, 20_000);

  it("deve atualizar os dados de uma campanha existente", async () => {
    const { id } = await createCampaign();

    const updateData = {
      title: `Campanha atualizada ${randomUUID()}`,
      goal_amount: 250,
      description: "Descrição atualizada pelo teste.",
      image: "🚀",
      active: false,
    };

    const response = await request(app)
      .put(`/campaigns/${id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      ...updateData,
    });
  }, 20_000);
});