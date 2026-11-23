import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import CampaignRoutes from "./routes/CampaignRoutes.js";
import OrganizerRoutes from "./routes/OrganizerRoutes.js";
import ContributorRoutes from "./routes/ContributorRoutes.js";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/api-docs");
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
);

app.use("/campaigns", CampaignRoutes);
app.use("/organizers", OrganizerRoutes);
app.use("/contributors", ContributorRoutes);

export default app;