import type { Request, Response } from "express";
import ContributorRepository from "../repositories/ContributorRepository.js";
import { Contributor } from "../models/Contributor.js";
import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

async function getAll(req: Request, res: Response) {
  try {
    const contributors = await ContributorRepository.findAll();
    return res.status(200).json(contributors);
  } catch (error) {
    console.error("Erro ao buscar contribuidores:", error);
    return res.status(500).json({
      message: "Erro ao buscar contribuidores.",
    });
  }
}

async function getById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do Contribuidor não informado.",
    });
  }
  try {
    const contributor = await ContributorRepository.findById(id);

    return res.status(200).json({
      id: contributor.getId(),
      name: contributor.getName(),
      description: contributor.getDescription(),
      icon: contributor.getIcon(),
      active: contributor.isActive(),
      created_at: contributor.getCreatedAt(),
      is_deleted: contributor.isDeleted(),
    });
  } catch (error) {
    console.error("Erro ao buscar contribuidor:", error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao buscar contribuidor.",
    });
  }
}

async function create(req: Request, res: Response) {
  const { name, description, icon } = req.body;

  try {
    const contributor = new Contributor(name, description, icon);

    const createdContributor = await ContributorRepository.create(contributor);

    return res.status(201).json(createdContributor);
  } catch (error) {
    console.error("Erro ao criar contribuidor:", error);

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao criar contribuidor.",
    });
  }
}

async function update(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do Contribuidor não informado.",
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
    const contributor = await ContributorRepository.findById(id);

    if (name !== undefined) {
      contributor.rename(name);
    }

    if (description !== undefined) {
      contributor.changeDescription(description);
    }

    if (icon !== undefined) {
      contributor.changeIcon(icon);
    }

    if (active === true) {
      contributor.activate();
    } else if (active === false) {
      contributor.deactivate();
    }

    const updatedContributor = await ContributorRepository.update(contributor);

    return res.status(200).json(updatedContributor);
  } catch (error) {
    console.error("Erro ao atualizar contribuidor:", error);

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
      message: "Erro interno ao atualizar contribuidor.",
    });
  }
}

async function disable(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID do Contribuidor não informado.",
    });
  }

  try {
    await ContributorRepository.disable(id);

    return res.status(200).json({
      message: "Contribuidor desativado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao desativar contribuidor:", error);

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno ao desativar contribuidor.",
    });
  }
}


export default {
  getAll,
  getById,
  create,
  update,
  disable,
};