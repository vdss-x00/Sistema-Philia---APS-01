import { ValidationError } from "../errors/ValidationError.js";


export class Contributor {
  private id: string | undefined;
  private campaign_id: string;
  private name: string;
  private description: string | undefined;
  private donation_amount: number;
  private icon: string | undefined;
  private active: boolean;
  private created_at: Date | undefined;

  constructor(
    campaign_id: string,
    name: string,
    donation_amount: number,
    description?: string,
    icon?: string,
  ) {
    this.id = undefined;
    this.campaign_id = "";
    this.name = "";
    this.description = description;
    this.donation_amount = 0;
    this.icon = undefined;
    this.active = true;
    this.created_at = undefined;

    this.changeCampaign(campaign_id);
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
    campaign_id: string,
    name: string,
    donation_amount: number,
    active: boolean,
    description?: string,
    icon?: string,
    created_at?: Date,
  ): Contributor {
    const contributor = new Contributor(
      campaign_id,
      name,
      donation_amount,
      description,
      icon,
    );

    contributor.id = id;
    contributor.active = active;
    contributor.created_at = created_at;

    return contributor;
  }

  getId(): string | undefined {
    return this.id;
  }

  getCampaignId(): string {
    return this.campaign_id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getDonationAmount(): number {
    return this.donation_amount;
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

    this.campaign_id = campaign_id.trim();
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

  changeDonationAmount(donation_amount: number): void {
    if (
      typeof donation_amount !== "number" ||
      !Number.isFinite(donation_amount) ||
      donation_amount < 0 ||
      Math.round(donation_amount * 100) !== donation_amount * 100
    ) {
      throw new ValidationError(
        "O valor da contribuição deve ser um número maior ou igual a zero, com no máximo duas casas decimais.",
      );
    }

    if (donation_amount >= 1_000_000_000_000) {
      throw new ValidationError(
        "O valor da contribuição excede o limite permitido.",
      );
    }

    this.donation_amount = donation_amount;
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
