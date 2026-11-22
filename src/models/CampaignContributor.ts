import { ValidationError } from "../errors/ValidationError.js";


export class CampaignContributor {
  private campaign_id: string;
  private contributor_id: string;
  private donation_amount: number;
  private created_at: Date | undefined;

  constructor(
    campaign_id: string,
    contributor_id: string,
    donation_amount: number,
  ) {
    this.campaign_id = "";
    this.contributor_id = "";
    this.donation_amount = 0;
    this.created_at = undefined;

    this.changeCampaign(campaign_id);
    this.changeContributor(contributor_id);
    this.changeDonationAmount(donation_amount);
  }

  static restore(
    campaign_id: string,
    contributor_id: string,
    donation_amount: number,
    created_at?: Date,
  ): CampaignContributor {
    const relationship = new CampaignContributor(
      campaign_id,
      contributor_id,
      donation_amount,
    );

    relationship.created_at = created_at;

    return relationship;
  }

  getCampaignId(): string {
    return this.campaign_id;
  }

  getContributorId(): string {
    return this.contributor_id;
  }

  getDonationAmount(): number {
    return this.donation_amount;
  }

  getCreatedAt(): Date | undefined {
    return this.created_at;
  }

  changeCampaign(campaign_id: string): void {
    this.validateUuid(campaign_id);
    this.campaign_id = campaign_id.trim();
  }

  changeContributor(contributor_id: string): void {
    this.validateUuid(contributor_id);
    this.contributor_id = contributor_id.trim();
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

  private validateUuid(value: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (typeof value !== "string" || !uuidRegex.test(value.trim())) {
      throw new ValidationError("O identificador deve ser um UUID válido.");
    }
  }
}
