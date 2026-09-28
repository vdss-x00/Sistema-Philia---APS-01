import { Router } from "express";
import OrganizerController from "../controllers/OrganizerController.js";

const router = Router();

router.get("/", OrganizerController.findAll);
router.get("/:id", OrganizerController.findById);
router.post("/", OrganizerController.create);
router.patch("/:id", OrganizerController.update);
router.patch("/:id/disable", OrganizerController.disable);

export default router;