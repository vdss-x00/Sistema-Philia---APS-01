import { ValidationError } from "../errors/ValidationError.js";


export class Campaign {
  private id: string | undefined;
  private organizer_id: string;
  private title: string;
  private description: string | undefined;
  private image: string | undefined;
  private goal_amount: number;
  private active: boolean;
  private created_at: Date | undefined;
  private updated_at: Date | undefined;

  constructor(
    organizer_id: string,
    title: string,
    goal_amount: number,
    description?: string,
    image?: string,
  ) {
    this.id = undefined;
    this.organizer_id = "";
    this.title = "";
    this.description = description;
    this.image = image;
    this.goal_amount = 0;
    this.active = true;
    this.created_at = undefined;
    this.updated_at = undefined;

    this.changeOrganizer(organizer_id);
    this.rename(title);
    this.changeGoalAmount(goal_amount);
    if (image !== undefined) this.changeImage(image);
    if (description !== undefined) this.changeDescription(description);
  }

  static restore(
    id: string,
    organizer_id: string,
    title: string,
    goal_amount: number,
    active: boolean,
    description?: string,
    image?: string,
    created_at?: Date,
    updated_at?: Date,
  ): Campaign {
    const campaign = new Campaign(
      organizer_id,
      title,
      goal_amount,
      description,
      image,
    );

    campaign.id = id;
    campaign.active = active;
    campaign.created_at = created_at;
    campaign.updated_at = updated_at;

    return campaign;
  }

  getId(): string | undefined {
    return this.id;
  }

  getOrganizerId(): string {
    return this.organizer_id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getImage(): string | undefined {
    return this.image;
  }

  getGoalAmount(): number {
    return this.goal_amount;
  }

  isActive(): boolean {
    return this.active;
  }

  getCreatedAt(): Date | undefined {
    return this.created_at;
  }

  getUpdatedAt(): Date | undefined {
    return this.updated_at;
  }

  changeOrganizer(organizer_id: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (typeof organizer_id !== "string" || !uuidRegex.test(organizer_id.trim())) {
      throw new ValidationError(
        "O identificador do organizador deve ser um UUID válido.",
      );
    }

    this.organizer_id = organizer_id.trim();
  }

  rename(title: string): void {
    if (typeof title !== "string" || title.trim().length === 0) {
      throw new ValidationError("O título da campanha é obrigatório.");
    }

    if (title.trim().length > 150) {
      throw new ValidationError(
        "O título deve ter no máximo 150 caracteres.",
      );
    }

    this.title = title.trim();
  }

  changeDescription(description: string): void {
    if (description.length > 500) {
      throw new ValidationError(
        "A descrição deve ter no máximo 500 caracteres.",
      );
    }

    this.description = description;
  }

  changeImage(image: string): void {
    if (image.length > 255) {
      throw new ValidationError(
        "O caminho da imagem deve ter no máximo 255 caracteres.",
      );
    }

    this.image = image;
  }

  changeGoalAmount(goal_amount: number): void {
    if (
      typeof goal_amount !== "number" ||
      !Number.isFinite(goal_amount) ||
      goal_amount < 0 ||
      !Number.isInteger(goal_amount * 100)
    ) {
      throw new ValidationError(
        "A meta da campanha deve ser um valor monetário válido e maior ou igual a zero, com no máximo duas casas decimais.",
      );
    }

    if (goal_amount >= 1_000_000_000_000) {
      throw new ValidationError(
        "A meta da campanha excede o limite permitido.",
      );
    }

    this.goal_amount = goal_amount;
  }

  activate(): void {
    this.active = true;
  }

  deactivate(): void {
    this.active = false;
  }
}
