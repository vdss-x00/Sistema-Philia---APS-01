import supabase from "../config/supabase.js";
import { Organizer } from "../models/Organizer.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";

async function findAll() {
    const { data, error } = await supabase.from("organizers").select("*");

    if (error) {
        throw error;
    }

    return data;
}

async function findById(id: string): Promise<Organizer> {
    const { data, error } = await supabase
        .from("organizers")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new NotFoundError("Organizador não encontrado.");
    }

    return Organizer.restore(
        data.id,
        data.name,
        data.active,
        data.description ?? undefined,
        data.icon ?? undefined,
    );
}

async function searchByKeyword(keyword: string) {
    const { data, error } = await supabase
        .from("organizers")
        .select("*")
        .or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);

    if (error) {
        throw error;
    }

    return data;
}

async function create(organizer: Organizer) {
    const { data, error } = await supabase
        .from("organizers")
        .insert({
            name: organizer.getName(),
            active: organizer.isActive(),
            description: organizer.getDescription(),
            icon: organizer.getIcon(),
        })
        .select()
        .single();

    if (error) {
        if (error.code === "23503") {
            throw new ValidationError("A categoria informada não existe.");
        }

        throw error;
    }

    return data;
}

async function update(organizer: Organizer) {
    const id = organizer.getId();

    if (!id) {
        throw new Error("Organizador sem ID não pode ser atualizado.");
    }

    const { data, error } = await supabase
        .from("organizers")
        .update({
            name: organizer.getName(),
            description: organizer.getDescription(),
            active: organizer.isActive(),
            icon: organizer.getIcon(),
        })
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new NotFoundError("Organizador não encontrado.");
    }

    return data;
}

async function remove(id: string) {
    const { data, error } = await supabase
        .from("organizers")
        .delete()
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new NotFoundError("Organizador não encontrado.");
    }

    return data;
}

export default {
    findAll,
    findById,
    searchByKeyword,
    create,
    update,
    remove,
};