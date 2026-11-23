import { randomUUID } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import supabase from "../../config/supabase.js";

describe("Contributor - Testes de integração", () => {
  const testNames: string[] = [];

  function makeContributorData() {
    const name = `Contribuidor integração ${randomUUID()}`;
    testNames.push(name);

    return {
      name,
      description: "Contribuidor criado pelo teste de integração",
      icon: "🏢",
    };
  }

  async function createContributor() {
    const data = makeContributorData();
    const response = await request(app).post("/contributors").send(data);

    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(expect.any(String));

    return {
      id: response.body.id as string,
      data,
    };
  }

  afterEach(async () => {
    if (testNames.length === 0) {
      return;
    }

    const { error } = await supabase
      .from("contributors")
      .delete()
      .in("name", testNames);

    testNames.length = 0;

    if (error) {
      throw new Error(`Falha ao limpar contribuidores do teste: ${error.message}`);
    }
  });

  it("deve criar um contribuidor válido", async () => {
    const data = makeContributorData();

    const response = await request(app).post("/contributors").send(data);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...data,
      active: true,
    });
  });

  it("deve listar os contribuidores incluindo o criado", async () => {
    const { id, data } = await createContributor();

    const response = await request(app).get("/contributors");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id,
          name: data.name,
        }),
      ]),
    );
  });

  it("deve consultar um contribuidor pelo ID", async () => {
    const { id, data } = await createContributor();

    const response = await request(app).get(`/contributors/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      ...data,
      active: true,
    });
  });

  it("deve atualizar um contribuidor existente", async () => {
    const { id } = await createContributor();
    const updateData = {
      name: `Contribuidor atualizado ${randomUUID()}`,
      description: "Descrição atualizada pelo teste",
      icon: "❤️",
      active: false,
    };

    testNames.push(updateData.name);

    const response = await request(app)
      .patch(`/contributors/${id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      ...updateData,
    });
  });

  it("deve desativar um contribuidor existente", async () => {
    const { id } = await createContributor();

    const response = await request(app).patch(`/contributors/${id}/disable`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      active: false,
    });
  });
});
