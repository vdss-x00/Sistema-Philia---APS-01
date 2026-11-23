import { Router } from "express";
import CampaignController from "../controllers/CampaignController.js";

const router = Router();

/**
 * @openapi
 * /campaigns:
 *   get:
 *     tags:
 *       - Campaigns
 *     summary: Listar todas as campanhas
 *     description: Retorna todas as campanhas cadastradas.
 *     responses:
 *       200:
 *         description: Lista de campanhas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 *       500:
 *         description: Erro interno ao buscar campanhas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", CampaignController.getAll);

/**
 * @openapi
 * /campaigns/{id}:
 *   get:
 *     tags:
 *       - Campaigns
 *     summary: Buscar campanha por ID
 *     description: Retorna uma campanha específica pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da campanha.
 *     responses:
 *       200:
 *         description: Campanha encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       404:
 *         description: Campanha não encontrada.
 *       500:
 *         description: Erro interno ao buscar campanha.
 */
router.get("/:id", CampaignController.getById);

/**
 * @openapi
 * /campaigns:
 *   post:
 *     tags:
 *       - Campaigns
 *     summary: Criar uma campanha
 *     description: Cadastra uma nova campanha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCampaign'
 *     responses:
 *       201:
 *         description: Campanha criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro interno ao criar campanha.
 */
router.post("/", CampaignController.create);

/**
 * @openapi
 * /campaigns/{id}:
 *   put:
 *     tags:
 *       - Campaigns
 *     summary: Atualizar uma campanha
 *     description: Atualiza os dados de uma campanha existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da campanha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCampaign'
 *     responses:
 *       200:
 *         description: Campanha atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Campanha não encontrada.
 *       500:
 *         description: Erro interno ao atualizar campanha.
 */
router.put("/:id", CampaignController.update);

/**
 * @openapi
 * /campaigns/{id}/disable:
 *   patch:
 *     tags:
 *       - Campaigns
 *     summary: Desativar uma campanha
 *     description: Desativa uma campanha pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da campanha.
 *     responses:
 *       200:
 *         description: Campanha desativada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Campanha não encontrada.
 *       500:
 *         description: Erro interno ao desativar campanha.
 */
router.patch("/:id/disable", CampaignController.deactivate);

export default router;