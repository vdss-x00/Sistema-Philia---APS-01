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
 *         description: Lista de contribuições retornada com sucesso.
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
 * /campaign-contributors/{campaign_id}/{contributor_id}:
 *   get:
 *     tags:
 *       - CampaignContributors
 *     summary: Buscar contribuição por campanha e contribuidor
 *     description: Retorna a contribuição identificada pela campanha e pelo contribuidor.
 *     parameters:
 *       - in: path
 *         name: campaign_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da campanha.
 *       - in: path
 *         name: contributor_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do contribuidor.
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
router.get(
  "/:campaign_id/:contributor_id",
  CampaignContributorController.getById,
);

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
 *             $ref: '#/components/schemas/CreateCampaignContributor'
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
 * /campaign-contributors/{campaign_id}/{contributor_id}:
 *   patch:
 *     tags:
 *       - CampaignContributors
 *     summary: Atualizar uma contribuição de campanha
 *     description: Atualiza os dados de uma contribuição de campanha existente.
 *     parameters:
 *       - in: path
 *         name: campaign_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da campanha.
 *       - in: path
 *         name: contributor_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do contribuidor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCampaignContributor'
 *     responses:
 *       200:
 *         description: Contribuição atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CampaignContributor'
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Contribuição não encontrada.
 *       500:
 *         description: Erro interno ao atualizar contribuição.
 */
router.patch(
  "/:campaign_id/:contributor_id",
  CampaignContributorController.update,
);


export default router;