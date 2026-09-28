import type { Request, Response } from "express";
import Organizer from "../models/Organizer.js";

async function findAll(req:Request, res:Response) {
    try {
        try {
            const organizer = await Organizer.findAll();

            res.status(200).json(organizer);
        } catch (error) {
            console.log("Erro ao buscar organizador: ");

            res.status(404).json({
                message: "Erro ao buscar organizador: ",
            });
        }
    } catch (error) {

    }
}

async function findById(req:Request<{ id:string }>, res:Response) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "ID do Organizador não informado.",
        });
    } try {
        const organizer = await Organizer.findById(id);

        res.status(200).json(organizer);
    } catch (error) {
        console.log("Erro ao buscar organizador: ", error);

        res.status(404).json({
            message: "Erro ao buscar organizador.",
        });
    }
}

async function create(req:Request, res:Response) {
    try {
        const organizer = await Organizer.create(req.body);

        res.status(201).json(organizer);
    } catch (error) {
        console.log("Erro ao criar organizador: ", error);

        res.status(500).json({
            message: "Erro ao criar categoria.",
        });
    }
}

async function update(req:Request<{ id:string }>, res:Response) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: "Id do organizador não informado.",
        });
    }

    const { name, description, icon, active } = req.body;
    const changes = { name, description, icon, active };
    const hasChanges = Object.values(changes).some((value) => value !== undefined);

    if (!hasChanges) {
        return res.status(400).json({
            message: "Informe ao menos um campo para atualizar.",
        });
    }

    try {
        const organizer = await Organizer.update(id, changes);
        return res.status(200).json(organizer);
    } catch (error) {
        console.error("Erro ao atualizar organizador:", error);
        return res.status(404).json({
            message: "Organizador não encontrado.",
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
		const organizer = await Organizer.disable(id);
		return res.status(200).json(organizer);
	} catch (error) {
		console.error("Erro ao desabilitar organizador:", error);
		return res.status(404).json({
			message: "Organizador não encontrado.",
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


