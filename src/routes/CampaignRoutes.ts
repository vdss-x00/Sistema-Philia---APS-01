import { Router } from "express";
import CampaignController from "../controllers/CampaignController.js";

const router = Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Listar todas as categorias
 *     description: Retorna todas as categorias cadastradas.
 *     responses:
 *       200:
 *         description: Lista de categorias retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro interno ao buscar categorias.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", CampaignController.getAll);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Buscar categoria por ID
 *     description: Retorna uma categoria específica pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria.
 *     responses:
 *       200:
 *         description: Categoria encontrada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno ao buscar categoria.
 */
router.get("/:id", CampaignController.getById);

/**
 * @openapi
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Criar uma categoria
 *     description: Cadastra uma nova categoria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro interno ao criar categoria.
 */
router.post("/", CampaignController.create);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Atualizar uma categoria
 *     description: Atualiza os dados de uma categoria existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno ao atualizar categoria.
 */
router.put("/:id", CampaignController.update);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Remover uma categoria
 *     description: Remove uma categoria pelo seu identificador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria.
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno ao remover categoria.
 */
router.delete("/:id", CampaignController.remove);

export default router;