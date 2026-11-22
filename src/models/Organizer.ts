import { ValidationError } from "../errors/ValidationError.js";


export class Organizer {
  private id: string | undefined;
  private name: string;
  private description: string | undefined;
  private icon: string | undefined;
  private active: boolean;
  private created_at: Date | undefined;

  constructor(
    name: string,
    description?: string,
    icon?: string,
  ) {
    this.id = undefined;
    this.name = "";
    this.description = description;
    this.icon = icon;
    this.active = true;
    this.created_at = undefined;

    this.rename(name);
    if (icon !== undefined) this.changeIcon(icon);
  }

  static restore(
    id: string,
    name: string,
    active: boolean,
    description?: string,
    icon?: string,
    created_at?: Date,
  ): Organizer {
    const organizer = new Organizer(name, description, icon);

    organizer.id = id;
    organizer.active = active;
    organizer.created_at = created_at;

    return organizer;
  }

  getId(): string | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getIcon(): string | undefined {
    return this.icon;
  }

  isActive(): boolean {
    return this.active;
  }

  getCreatedAt(): Date | undefined {
    return this.created_at;
  }

  rename(name: string): void {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new ValidationError("O nome do organizador é obrigatório.");
    }

    if (name.trim().length > 100) {
      throw new ValidationError("O nome deve ter no máximo 100 caracteres.");
    }

    this.name = name.trim();
  }

  changeDescription(description: string): void {
    if (description.length > 255) {
      throw new ValidationError(
        "A descrição deve ter no máximo 255 caracteres.",
      );
    }

    this.description = description;
  }

  changeIcon(icon: string): void {
    if (icon.length > 10) {
      throw new ValidationError(
        "O ícone deve ter no máximo 10 caracteres.",
      );
    }

    this.icon = icon;
  }

  activate(): void {
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }
}
