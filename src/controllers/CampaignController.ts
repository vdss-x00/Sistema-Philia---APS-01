import type { Request, Response } from "express";
import CampaignRepository from "../repositories/CampaignRepository.js";
import { Campaign } from "../models/Campaign.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function getAll(req: Request, res: Response) {
  try {
    try {
      const campaigns = await CampaignRepository.findAll();

      res.status(200).json(campaigns);
    } catch (error) {
      console.log("Erro ao buscar campanhas: ", error);

      res.status(404).json({
        message: "Erro ao buscar campanhas.",
      });
    }
  } catch (error) { }
}

async function getById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }
  try {
    const campaign = await CampaignRepository.findById(id);

    res.status(200).json({
      id: campaign.getId(),
      organizer_id: campaign.getOrganizerId(),
      title: campaign.getTitle(),
      description: campaign.getDescription(),
      image: campaign.getImage(),
      goal_amount: campaign.getGoalAmount(),
      active: campaign.isActive(),
      created_at: campaign.getCreatedAt(),
      updated_at: campaign.getUpdatedAt(),
    });
  } catch (error) {
    console.log("Erro ao buscar campanha: ", error);

    if (error instanceof NotFoundError) {
      res.status(404).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Erro interno ao buscar campanha.",
    });
  }
}

async function create(req: Request, res: Response) {
  const { organizer_id, title, goal_amount, description, image } = req.body;

  try {
    const campaign = new Campaign(
      organizer_id,
      title,
      goal_amount,
      description,
      image,
    );

    const createdCampaign = await CampaignRepository.create(campaign);

    res.status(201).json(createdCampaign);
  } catch (error) {
    console.log("Erro ao criar campanha: ", error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erro interno ao criar campanha.",
    });
  }
}

async function update(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const {
    organizer_id,
    title,
    goal_amount,
    description,
    image,
    active,
  } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }

  try {
    const campaign = await CampaignRepository.findById(id);

    if (organizer_id !== undefined) {
      campaign.changeOrganizer(organizer_id);
    }

    if (title !== undefined) {
      campaign.rename(title);
    }

    if (description !== undefined) {
      campaign.changeDescription(description);
    }

    if (image !== undefined) {
      campaign.changeImage(image);
    }

    if (goal_amount !== undefined) {
      campaign.changeGoalAmount(goal_amount);
    }

    if (active === true) {
      campaign.activate();
    }

    if (active === false) {
      campaign.deactivate();
    }

    const updatedCampaign = await CampaignRepository.update(campaign);

    res.status(200).json(updatedCampaign);
  } catch (error) {
    console.log("Erro ao atualizar campanha: ", error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error instanceof NotFoundError) {
      res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Erro interno ao atualizar campanha.",
    });
  }
}

async function deactivate(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }

  try {
    await CampaignRepository.deactivate(id);

    res.status(200).json({
      message: "Campanha desativada com sucesso!",
    });
  } catch (error) {
    console.log("Erro ao desativar campanha: ", error);

    if (error instanceof NotFoundError) {
      res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao desativar campanha.",
    });
  }
}


export default {
  getAll,
  getById,
  create,
  update,
  deactivate
};