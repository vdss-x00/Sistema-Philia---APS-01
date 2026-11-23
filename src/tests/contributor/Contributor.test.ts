import { describe, expect, it } from "vitest";
import { Contributor } from "../../models/Contributor.js";

describe("Contributor - Testes unitários", () => {
  it("deve criar um contribuidor válido", () => {
    const contributor = new Contributor(
      "Contribuidor de Teste",
      "Descrição do contribuidor de teste",
      "👤",
    );
    
    expect(contributor.getId()).toBeUndefined();
    expect(contributor.getName()).toBe("Contribuidor de Teste");
    expect(contributor.getDescription()).toBe("Descrição do contribuidor de teste");
    expect(contributor.getIcon()).toBe("👤");
    expect(contributor.isActive()).toBe(true);
    expect(contributor.isDeleted()).toBe(false);
  });


  it("não deve permitir criar um contribuidor sem nome", () => {
    expect(() => new Contributor("   ")).toThrow(
      "O nome do contribuidor é obrigatório.",
    );
  });

  it("deve remover espaços antes e depois do nome", () => {
    const contributor = new Contributor(
      "  Contribuidor de Teste  ",
      "Descrição",
      "👤",
    );

    expect(contributor.getName()).toBe("Contribuidor de Teste");
  });

  it("não deve permitir nome com mais de 100 caracteres", () => {
    expect(() => new Contributor("a".repeat(101))).toThrow(
      "O nome deve ter no máximo 100 caracteres.",
    );
  });

  it("não deve permitir descrição com mais de 255 caracteres", () => {
    const contributor = new Contributor("Contribuidor", "a".repeat(256), "👤");

    expect(() => contributor.changeDescription("a".repeat(256))).toThrow(
      "A descrição deve ter no máximo 255 caracteres.",
    );
  });

  it("não deve permitir ícone com mais de 10 caracteres", () => {
    const contributor = new Contributor("Contribuidor", "Descrição", "👤");

    expect(() => contributor.changeIcon("a".repeat(11))).toThrow(
      "O ícone deve ter no máximo 10 caracteres.",
    );
  });

  it("deve permitir alterar os dados de um contribuidor", () => {
    const contributor = new Contributor("Contribuidor", "Descrição", "👤");

    contributor.rename("Contribuidor Atualizado");
    contributor.changeDescription("Nova descrição");
    contributor.changeIcon("❤️");

    expect(contributor.getName()).toBe("Contribuidor Atualizado");
    expect(contributor.getDescription()).toBe("Nova descrição");
    expect(contributor.getIcon()).toBe("❤️");
  });

  it("deve desativar e reativar um contribuidor", () => {
    const contributor = new Contributor("Contribuidor", "Descrição", "👤");

    contributor.deactivate();
    expect(contributor.isActive()).toBe(false);

    contributor.activate();
    expect(contributor.isActive()).toBe(true);
  });

  it("deve restaurar um contribuidor existente", () => {
    const id = "44ec31af-a216-4b49-a112-e51e3187378c";
    const createdAt = new Date("2026-01-01T00:00:00.000Z");
    const contributor = Contributor.restore(
      id,
      "Contribuidor Restaurado",
      false,
      "Descrição restaurada",
      "👤",
      createdAt,
    );

    expect(contributor.getId()).toBe(id);
    expect(contributor.getName()).toBe("Contribuidor Restaurado");
    expect(contributor.getDescription()).toBe("Descrição restaurada");
    expect(contributor.getIcon()).toBe("👤");
    expect(contributor.isActive()).toBe(false);
    expect(contributor.getCreatedAt()).toBe(createdAt);
  });
});