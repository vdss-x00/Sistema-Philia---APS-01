import { ValidationError } from "../errors/ValidationError.js";


export class Contributor {
  private id: string | undefined;
  private name: string;
  private description: string | undefined;
  private icon: string | undefined;
  private active: boolean;
  private created_at: Date | undefined;
  private is_deleted: boolean;

  constructor(
    name: string,
    description?: string,
    icon?: string,
    is_deleted: boolean = false,
  ) {
    this.id = undefined;
    this.name = "";
    this.description = description;
    this.icon = undefined;
    this.is_deleted = is_deleted;
    this.active = true;
    this.created_at = undefined;
    this.rename(name);


    if (description !== undefined) {
      this.changeDescription(description);
    }

    if (icon !== undefined) {
      this.changeIcon(icon);
    }
  }

  static restore(
    id: string,
    name: string,
    active: boolean,
    description?: string,
    icon?: string,
    created_at?: Date,
    is_deleted: boolean = false,
  ): Contributor {
    const contributor = new Contributor(
      name,
      description,
      icon,
      is_deleted
    );

    contributor.id = id;
    contributor.active = active;
    contributor.created_at = created_at;

    return contributor;
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

  isDeleted(): boolean {
    return this.is_deleted;
  }

  changeCampaign(campaign_id: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (
      typeof campaign_id !== "string" ||
      !uuidRegex.test(campaign_id.trim())
    ) {
      throw new ValidationError(
        "O identificador da campanha deve ser um UUID válido.",
      );
    }
  }

  rename(name: string): void {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new ValidationError("O nome do contribuinte é obrigatório.");
    }

    if (name.trim().length > 100) {
      throw new ValidationError(
        "O nome deve ter no máximo 100 caracteres.",
      );
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
