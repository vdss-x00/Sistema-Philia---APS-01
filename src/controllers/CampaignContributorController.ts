import type { Request, Response } from "express";
import CampaignContributorRepository from "../repositories/CampaignContributorRepository.js";
import { CampaignContributor } from "../models/CampaignContributor.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function getAll(req: Request, res: Response) {
  try {
    const contributors = await CampaignContributorRepository.findAll();
    return res.status(200).json(contributors);
  } catch (error) {
    console.error("Erro ao buscar contribuidores:", error);
    return res.status(500).json({
      message: "Erro ao buscar contribuidores.",
    });
  }
}

async function getById(
  req: Request<{ campaign_id: string; contributor_id: string }>,
  res: Response,
) {
  const { campaign_id, contributor_id } = req.params;

  if (!campaign_id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }

  if (!contributor_id) {
    return res.status(400).json({
      message: "ID do Contribuidor não informado.",
    });
  }

  try {
    const campaign_contributor = await CampaignContributorRepository.findById(campaign_id, contributor_id);

    return res.status(200).json({
      campaign_id: campaign_contributor.getCampaignId(),
      contributor_id: campaign_contributor.getContributorId(),
      donation_amount: campaign_contributor.getDonationAmount(),
      created_at: campaign_contributor.getCreatedAt(),
    });
  } catch (error) {
    console.error("Erro ao buscar contribuidor:", error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao buscar contribuição.",
    });
  }
}

async function create(req: Request, res: Response) {
  const { campaign_id, contributor_id, donation_amount } = req.body;

  try {
    if (typeof donation_amount !== "number") {
      throw new ValidationError("O valor da contribuição deve ser informado.");
    }

    const campaign_contributor = new CampaignContributor(
        campaign_id,
        contributor_id,
        donation_amount
    );

    const createdCampaignContributor = await CampaignContributorRepository.create(campaign_contributor);

    return res.status(201).json(createdCampaignContributor);
  } catch (error) {
    console.error("Erro ao criar contribuição:", error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao criar contribuição.",
    });
  }
}

async function update(req: Request<{ campaign_id: string, contributor_id: string }>, res: Response) {
  const { campaign_id, contributor_id } = req.params;

  if (!campaign_id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }

  if (!contributor_id) {
    return res.status(400).json({
      message: "ID do Contribuidor não informado.",
    });
  }

  const { donation_amount } = req.body;
  const hasChanges = donation_amount !== undefined;
    

  if (!hasChanges) {
    return res.status(400).json({
      message: "Informe o valor da doação para atualizar.",
    });
  }

  try {
    const campaign_contributor = await CampaignContributorRepository.findById(campaign_id, contributor_id);

    if (campaign_id !== undefined) {
      campaign_contributor.changeCampaign(campaign_id);
    }

    if (contributor_id !== undefined) {
      campaign_contributor.changeContributor(contributor_id);
    }

    if (donation_amount !== undefined) {
      campaign_contributor.changeDonationAmount(donation_amount);
    }


    const updatedCampaignContributor = await CampaignContributorRepository.update(campaign_contributor);

    return res.status(200).json(updatedCampaignContributor);
  } catch (error) {
    console.error("Erro ao atualizar contribuição:", error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao atualizar contribuição.",
    });
  }
}

export default {
  getAll,
  getById,
  create,
  update
};