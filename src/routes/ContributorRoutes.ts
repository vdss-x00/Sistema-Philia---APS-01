import { Router } from "express";
import ContributorController from "../controllers/ContributorController.js";

const router = Router();

/**
 * @openapi
 * /contributors:
 *   get:
 *     tags:
 *       - Contributors
 *     summary: Listar todos os contribuidores
 *     description: Retorna todas as categorias cadastradas.
 *     responses:
 *       200:
 *         description: Lista de categorias retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contributor'
 *       500:
 *         description: Erro interno ao buscar contribuidores.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", ContributorController.getAll);

/**
 * @openapi
 * /contributors/{id}:
 *   get:
 *     tags:
 *       - Contributors
 *     summary: Buscar contribuidor por ID
 *     description: Retorna um contribuidor específico pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contribuidor.
 *     responses:
 *       200:
 *         description: Contribuidor encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contributor'
 *       404:
 *         description: Contribuidor não encontrado.
 *       500:
 *         description: Erro interno ao buscar contribuidor.
 */
router.get("/:id", ContributorController.getById);

/**
 * @openapi
 * /contributors:
 *   post:
 *     tags:
 *       - Contributors
 *     summary: Criar um contribuidor
 *     description: Cadastra um novo contribuidor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContributor'
 *     responses:
 *       201:
 *         description: Contribuidor criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contributor'
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro interno ao criar contribuidor.
 */
router.post("/", ContributorController.create);

/**
 * @openapi
 * /contributors/{id}:
 *   patch:
 *     tags:
 *       - Contributors
 *     summary: Atualizar um contribuidor
 *     description: Atualiza os dados de um contribuidor existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contribuidor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContributor'
 *     responses:
 *       200:
 *         description: Contribuidor atualizado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Contribuidor não encontrado.
 *       500:
 *         description: Erro interno ao atualizar contribuidor.
 */
router.patch("/:id", ContributorController.update);

/**
 * @openapi
 * /contributors/{id}/disable:
 *   patch:
 *     tags:
 *       - Contributors
 *     summary: Desativa um contribuidor
 *     description: Desativa um contribuidor pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contribuidor.
 *     responses:
 *       200:
 *         description: Contribuidor desativado com sucesso.
 *       404:
 *         description: Contribuidor não encontrado.
 *       500:
 *         description: Erro interno ao desativar contribuidor.
 */
router.patch("/:id/disable", ContributorController.disable);

export default router;