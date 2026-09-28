import express from "express";
import supabase from "./config/supabase.js";
import { randomUUID } from "node:crypto";
import CampaignRoutes from "./routes/CampaignRoutes.js";
import OrganizerRoutes from "./routes/OrganizerRoutes.js";






const app = express();
app.use(express.json());

export default app;