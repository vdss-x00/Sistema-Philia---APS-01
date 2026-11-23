import type { Request, Response } from "express";
import { Organizer } from "../models/Organizer.js";
import OrganizerRepository from "../repositories/OrganizerRepository.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function findAll(req: Request, res: Response) {
  try {
    const organizers = await OrganizerRepository.findAll();
    return res.status(200).json(organizers);
  } catch (error) {
    console.error("Erro ao buscar organizadores:", error);
    return res.status(500).json({
      message: "Erro ao buscar organizadores.",
    });
  }
}

async function findById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do organizador não informado.",
    });
  }

  try {
    const organizer = await OrganizerRepository.findById(id);

    return res.status(200).json({
      id: organizer.getId(),
      name: organizer.getName(),
      description: organizer.getDescription(),
      icon: organizer.getIcon(),
      active: organizer.isActive(),
      created_at: organizer.getCreatedAt(),
    });
  } catch (error) {
    console.error("Erro ao buscar organizador:", error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao buscar organizador.",
    });
  }
}

async function create(req: Request, res: Response) {
  const { name, description, icon } = req.body;

  try {
    const organizer = new Organizer(name, description, icon);
    const createdOrganizer = await OrganizerRepository.create(organizer);

    return res.status(201).json(createdOrganizer);
  } catch (error) {
    console.error("Erro ao criar organizador:", error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao criar organizador.",
    });
  }
}

async function update(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do organizador não informado.",
    });
  }

  const { name, description, icon, active } = req.body;
  const hasChanges =
    name !== undefined ||
    description !== undefined ||
    icon !== undefined ||
    active !== undefined;

  if (!hasChanges) {
    return res.status(400).json({
      message: "Informe ao menos um campo para atualizar.",
    });
  }

  try {
    const organizer = await OrganizerRepository.findById(id);

    if (name !== undefined) {
      organizer.rename(name);
    }

    if (description !== undefined) {
      organizer.changeDescription(description);
    }

    if (icon !== undefined) {
      organizer.changeIcon(icon);
    }

    if (active === true) {
      organizer.activate();
    } else if (active === false) {
      organizer.deactivate();
    }

    const updatedOrganizer = await OrganizerRepository.update(organizer);

    return res.status(200).json(updatedOrganizer);
  } catch (error) {
    console.error("Erro ao atualizar organizador:", error);

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
      message: "Erro interno ao atualizar organizador.",
    });
  }
}

async function disable(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do organizador não informado.",
    });
  }

  try {
    const organizer = await OrganizerRepository.findById(id);
    organizer.deactivate();

    const disabledOrganizer = await OrganizerRepository.disable(id);

    return res.status(200).json(disabledOrganizer);
  } catch (error) {
    console.error("Erro ao desabilitar organizador:", error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao desabilitar organizador.",
    });
  }
}

export default {
  findAll,
  findById,
  create,
  update,
  disable,
};
