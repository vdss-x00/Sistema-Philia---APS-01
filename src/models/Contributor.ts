import { ValidationError } from "../errors/ValidationError.js";


export class Contributor {
  private id: string | undefined;
  private name: string;
  private description: string | undefined;
  private icon: string | undefined;
  private active: boolean;
  private created_at: Date | undefined;
  private is_deleted: boolean;
  private donation_amount: number;

  constructor(
    name: string,
    description?: string,
    icon?: string,
    is_deleted: boolean = false,
    donation_amount: number = 0,
  ) {
    this.id = undefined;
    this.name = "";
    this.description = description;
    this.icon = undefined;
    this.is_deleted = is_deleted;
    this.active = true;
    this.created_at = undefined;
    this.donation_amount = 0;
    this.rename(name);
    this.changeDonationAmount(donation_amount);


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
    donation_amount: number = 0,
  ): Contributor {
    const contributor = new Contributor(
      name,
      description,
      icon,
      is_deleted,
      donation_amount,
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

  getDonationAmount(): number {
    return this.donation_amount;
  }

  changeDonationAmount(amount: number): void {
    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount < 0 ||
      Math.round(amount * 100) !== amount * 100 ||
      amount >= 1_000_000_000_000
    ) {
      throw new ValidationError(
        "O valor da contribuição deve ser válido e possuir no máximo duas casas decimais.",
      );
    }

    this.donation_amount = amount;
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
      throw new ValidationError("O nome do contribuidor é obrigatório.");
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
