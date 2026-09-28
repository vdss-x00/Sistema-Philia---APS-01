import type { Request, Response } from "express";
import Campaign from "../models/Campaign.js";

async function getAll(req: Request, res: Response) {
  try {
    try {
      const campaigns = await Campaign.findAll();

      res.status(200).json(campaigns);
    } catch (error) {
      console.log("Erro ao buscar campanhas: ", error);

      res.status(404).json({
        message: "Erro ao buscar campanhas.",
      });
    }
  } catch (error) {}
}

async function getById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }
  try {
    const campaign = await Campaign.findById(id);

    res.status(200).json(campaign);
  } catch (error) {
    console.log("Erro ao buscar campanha: ", error);

    res.status(404).json({
      message: "Erro ao buscar campanha.",
    });
  }
}

async function create(req: Request, res: Response) {
  try {
    const campaign = await Campaign.create(req.body);

    res.status(201).json(campaign);
  } catch (error) {
    console.log("Erro ao criar campanha: ", error);

    res.status(500).json({
      message: "Erro ao criar campanha.",
    });
  }
}

async function update(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }

  try {
    const campaign = await Campaign.update(id, req.body);

    res.status(200).json(campaign);
  } catch (error) {
    console.log("Erro ao atualizar campanha: ", error);

    res.status(404).json({
      message: "Campanha não encontrada.",
    });
  }
}

async function remove(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID da Campanha não informado.",
    });
  }

  try {
    const campaign = await Campaign.remove(id);

    res.status(200).json({
      message: "Campanha removida com sucesso!",
    });
  } catch (error) {
    console.log("Erro ao remover campanha: ", error);

    res.status(404).json({
      message: "Campanha não encontrada.",
    });
  }
}



export default {
  getAll,
  getById,
  create,
  update,
  remove,
};