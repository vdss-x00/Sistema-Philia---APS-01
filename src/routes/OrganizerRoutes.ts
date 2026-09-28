import { Router } from "express";
import OrganizerController from "../controllers/OrganizerController.js";

const router = Router();

router.patch("/", OrganizerController.findAll);
router.patch("/:id", OrganizerController.findById);
router.patch("/:id", OrganizerController.create);
router.patch("/:id", OrganizerController.update);
router.patch("/:id/disable", OrganizerController.disable);

export default router;