import express from "express";
import CampaignRoutes from "./routes/CampaignRoutes.js";
import OrganizerRoutes from "./routes/OrganizerRoutes.js";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Philia Fundraising System API",
    version: "1.0.0",
  });
});

app.use("/campaigns", CampaignRoutes);
app.use("/organizers", OrganizerRoutes);

export default app;