import { randomUUID } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import supabase from "../../config/supabase.js";

describe("Organizer - Testes de integração", () => {
  const testNames: string[] = [];

  function makeOrganizerData() {
    const name = `Organizador integração ${randomUUID()}`;
    testNames.push(name);

    return {
      name,
      description: "Organizador criado pelo teste de integração",
      icon: "🏢",
    };
  }

  async function createOrganizer() {
    const data = makeOrganizerData();
    const response = await request(app).post("/organizers").send(data);

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
      .from("organizers")
      .delete()
      .in("name", testNames);

    testNames.length = 0;

    if (error) {
      throw new Error(`Falha ao limpar organizadores do teste: ${error.message}`);
    }
  });

  it("deve criar um organizador válido", async () => {
    const data = makeOrganizerData();

    const response = await request(app).post("/organizers").send(data);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...data,
      active: true,
    });
  });

  it("deve listar os organizadores incluindo o criado", async () => {
    const { id, data } = await createOrganizer();

    const response = await request(app).get("/organizers");

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

  it("deve consultar um organizador pelo ID", async () => {
    const { id, data } = await createOrganizer();

    const response = await request(app).get(`/organizers/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      ...data,
      active: true,
    });
  });

  it("deve atualizar um organizador existente", async () => {
    const { id } = await createOrganizer();
    const updateData = {
      name: `Organizador atualizado ${randomUUID()}`,
      description: "Descrição atualizada pelo teste",
      icon: "❤️",
      active: false,
    };

    testNames.push(updateData.name);

    const response = await request(app)
      .patch(`/organizers/${id}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      ...updateData,
    });
  });

  it("deve desativar um organizador existente", async () => {
    const { id } = await createOrganizer();

    const response = await request(app).patch(`/organizers/${id}/disable`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id,
      active: false,
    });
  });
});
