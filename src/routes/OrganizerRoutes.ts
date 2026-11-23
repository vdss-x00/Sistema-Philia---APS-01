
import { Router } from "express";
import OrganizerController from "../controllers/OrganizerController.js";

const router = Router();

/**
 * @openapi
 * /organizers:
 *   get:
 *     tags:
 *       - Organizers
 *     summary: Listar todos os organizadores
 *     description: Retorna todos os organizadores cadastrados.
 *     responses:
 *       200:
 *         description: Lista de organizadores retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organizer'
 *       500:
 *         description: Erro interno ao buscar organizadores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", OrganizerController.findAll);

/**
 * @openapi
 * /organizers/{id}:
 *   get:
 *     tags:
 *       - Organizers
 *     summary: Buscar organizador por ID
 *     description: Retorna um organizador específico pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do organizador.
 *     responses:
 *       200:
 *         description: Organizador encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizer'
 *       404:
 *         description: Organizador não encontrado.
 *       500:
 *         description: Erro interno ao buscar organizador.
 */
router.get("/:id", OrganizerController.findById);

/**
 * @openapi
 * /organizers:
 *   post:
 *     tags:
 *       - Organizers
 *     summary: Criar um organizador
 *     description: Cadastra um novo organizador.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrganizer'
 *     responses:
 *       201:
 *         description: Organizador criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizer'
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro interno ao criar organizador.
 */
router.post("/", OrganizerController.create);

/**
 * @openapi
 * /organizers/{id}:
 *   patch:
 *     tags:
 *       - Organizers
 *     summary: Atualizar um organizador
 *     description: Atualiza os dados de um organizador existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do organizador.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrganizer'
 *     responses:
 *       200:
 *         description: Organizador atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizer'
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Organizador não encontrado.
 *       500:
 *         description: Erro interno ao atualizar organizador.
 */
router.patch("/:id", OrganizerController.update);

/**
 * @openapi
 * /organizers/{id}/disable:
 *   patch:
 *     tags:
 *       - Organizers
 *     summary: Desativar um organizador
 *     description: Desativa um organizador pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do organizador.
 *     responses:
 *       200:
 *         description: Organizador desativado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organizer'
 *       404:
 *         description: Organizador não encontrado.
 *       500:
 *         description: Erro interno ao desativar organizador.
 */
router.patch("/:id/disable", OrganizerController.disable);

export default router;