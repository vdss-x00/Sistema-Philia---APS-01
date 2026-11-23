import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import CampaignRoutes from "./routes/CampaignRoutes.js";
import OrganizerRoutes from "./routes/OrganizerRoutes.js";
import ContributorRoutes from "./routes/ContributorRoutes.js";
import CampaignContributorRoutes from "./routes/CampaignContributorRoutes.js";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/api-docs/");
});

app.get(/^\/api-docs$/, (req, res) => {
    res.redirect(308, "/api-docs/");
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            tryItOutEnabled: true,
        },
    }),
);

app.use("/campaigns", CampaignRoutes);
app.use("/organizers", OrganizerRoutes);
app.use("/contributors", ContributorRoutes);
app.use("/campaign-contributors", CampaignContributorRoutes);

export default app;