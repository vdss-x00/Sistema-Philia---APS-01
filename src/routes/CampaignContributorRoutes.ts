import { Router } from "express";
import CampaignContributorController from "../controllers/CampaignContributorController.js";

const router = Router();

/**
 * @openapi
 * /campaign-contributors:
 *   get:
 *     tags:
 *       - CampaignContributors
 *     summary: Listar todas as contribuições de campanha
 *     description: Retorna todas as contribuições de campanha cadastradas.
 *     responses:
 *       200:
 *         description: Lista de categorias retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CampaignContributor'
 *       500:
 *         description: Erro interno ao buscar contribuições.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", CampaignContributorController.getAll);

/**
 * @openapi
 * /campaign-contributors/{id}:
 *   get:
 *     tags:
 *       - CampaignContributors
 *     summary: Buscar contribuidor de campanha por ID
 *     description: Retorna uma contribuição de campanha específica pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da contribuição.
 *     responses:
 *       200:
 *         description: Contribuição encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CampaignContributor'
 *       404:
 *         description: Contribuição não encontrada.
 *       500:
 *         description: Erro interno ao buscar contribuição.
 */
router.get("/:id", CampaignContributorController.getById);

/**
 * @openapi
 * /campaign-contributors:
 *   post:
 *     tags:
 *       - CampaignContributors
 *     summary: Criar uma contribuição de campanha
 *     description: Cadastra uma nova contribuição de campanha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContributor'
 *     responses:
 *       201:
 *         description: Contribuição criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CampaignContributor'
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro interno ao criar contribuição.
 */
router.post("/", CampaignContributorController.create);

/**
 * @openapi
 * /campaign-contributors/{id}:
 *   patch:
 *     tags:
 *       - CampaignContributors
 *     summary: Atualizar uma contribuição de campanha
 *     description: Atualiza os dados de uma contribuição de campanha existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da contribuição  .
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCampaignContributor'
 *     responses:
 *       200:
 *         description: Contribuição atualizada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Contribuição não encontrada.
 *       500:
 *         description: Erro interno ao atualizar contribuição.
 */
router.patch("/:id", CampaignContributorController.update);


export default router;