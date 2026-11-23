import { describe, expect, it } from "vitest";
import { Organizer } from "../../models/Organizer.js";

describe("Organizer - Testes unitários", () => {
  it("deve criar um organizador válido", () => {
    const organizer = new Organizer(
      "Organizador de Teste",
      "Descrição do organizador de teste",
      "🏢",
    );

    expect(organizer.getId()).toBeUndefined();
    expect(organizer.getName()).toBe("Organizador de Teste");
    expect(organizer.getDescription()).toBe("Descrição do organizador de teste");
    expect(organizer.getIcon()).toBe("🏢");
    expect(organizer.isActive()).toBe(true);
  });

  it("não deve permitir criar um organizador sem nome", () => {
    expect(() => new Organizer("   ")).toThrow(
      "O nome do organizador é obrigatório.",
    );
  });

  it("deve remover espaços antes e depois do nome", () => {
    const organizer = new Organizer(
      "  Organizador de Teste  ",
      "Descrição",
      "🏢",
    );

    expect(organizer.getName()).toBe("Organizador de Teste");
  });

  it("não deve permitir nome com mais de 100 caracteres", () => {
    expect(() => new Organizer("a".repeat(101))).toThrow(
      "O nome deve ter no máximo 100 caracteres.",
    );
  });

  it("não deve permitir descrição com mais de 255 caracteres", () => {
    const organizer = new Organizer("Organizador");

    expect(() => organizer.changeDescription("a".repeat(256))).toThrow(
      "A descrição deve ter no máximo 255 caracteres.",
    );
  });

  it("não deve permitir ícone com mais de 10 caracteres", () => {
    const organizer = new Organizer("Organizador");

    expect(() => organizer.changeIcon("a".repeat(11))).toThrow(
      "O ícone deve ter no máximo 10 caracteres.",
    );
  });

  it("deve permitir alterar os dados de um organizador", () => {
    const organizer = new Organizer("Organizador", "Descrição", "🏢");

    organizer.rename("Organizador Atualizado");
    organizer.changeDescription("Nova descrição");
    organizer.changeIcon("❤️");

    expect(organizer.getName()).toBe("Organizador Atualizado");
    expect(organizer.getDescription()).toBe("Nova descrição");
    expect(organizer.getIcon()).toBe("❤️");
  });

  it("deve desativar e reativar um organizador", () => {
    const organizer = new Organizer("Organizador");

    organizer.deactivate();
    expect(organizer.isActive()).toBe(false);

    organizer.activate();
    expect(organizer.isActive()).toBe(true);
  });

  it("deve restaurar um organizador existente", () => {
    const id = "44ec31af-a216-4b49-a112-e51e3187378c";
    const createdAt = new Date("2026-01-01T00:00:00.000Z");
    const organizer = Organizer.restore(
      id,
      "Organizador Restaurado",
      false,
      "Descrição restaurada",
      "🏢",
      createdAt,
    );

    expect(organizer.getId()).toBe(id);
    expect(organizer.getName()).toBe("Organizador Restaurado");
    expect(organizer.getDescription()).toBe("Descrição restaurada");
    expect(organizer.getIcon()).toBe("🏢");
    expect(organizer.isActive()).toBe(false);
    expect(organizer.getCreatedAt()).toBe(createdAt);
  });
});
