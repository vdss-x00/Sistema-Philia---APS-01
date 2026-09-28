import { Router } from "express";
import CampaignController from "../controllers/CampaignController.js";

const router = Router();

router.get("/", CampaignController.getAll);
router.get("/:id", CampaignController.getById);
router.post("/", CampaignController.create);
router.put("/:id", CampaignController.update);
router.delete("/:id/disable", CampaignController.remove);

export default router;