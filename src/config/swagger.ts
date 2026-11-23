import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Philia Fundraising System API",
      version: "1.0.0",
      description:
        "API REST para gerenciamento de campanhas, organizadores e contribuintes da plataforma de crowdfunding.",
    },
    servers: [
      {
        url: "/",
        description: "Servidor atual",
      },
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
    ],
    tags: [
      {
        name: "Campaigns",
        description: "Gerenciamento de campanhas",
      },
      {
        name: "Organizers",
        description: "Gerenciamento de organizadores",
      },
    ],
    components: {
      schemas: {
        Campaign: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              readOnly: true,
            },
            organizer_id: {
              type: "string",
              format: "uuid",
            },
            title: {
              type: "string",
              maxLength: 150,
              example: "Campanha Solidária",
            },
            description: {
              type: "string",
              maxLength: 500,
              example: "Arrecadação para apoiar uma causa",
            },
            image: {
              type: "string",
              maxLength: 255,
              example: "campanha.jpg",
            },
            goal_amount: {
              type: "number",
              minimum: 0,
              example: 1000,
            },
            active: {
              type: "boolean",
              example: true,
            },
            created_at: {
              type: "string",
              format: "date-time",
              readOnly: true,
            },
            updated_at: {
              type: "string",
              format: "date-time",
              readOnly: true,
            },
          },
        },
        CreateCampaign: {
          type: "object",
          required: ["organizer_id", "title", "goal_amount"],
          properties: {
            organizer_id: {
              type: "string",
              format: "uuid",
            },
            title: {
              type: "string",
              maxLength: 150,
              example: "Campanha Solidária",
            },
            description: {
              type: "string",
              maxLength: 500,
              example: "Arrecadação para apoiar uma causa",
            },
            image: {
              type: "string",
              maxLength: 255,
              example: "campanha.jpg",
            },
            goal_amount: {
              type: "number",
              minimum: 0,
              example: 1000,
            },
          },
        },
        UpdateCampaign: {
          type: "object",
          properties: {
            title: {
              type: "string",
              maxLength: 150,
              example: "Campanha Solidária",
            },
            description: {
              type: "string",
              maxLength: 500,
              example: "Arrecadação para apoiar uma causa",
            },
            image: {
              type: "string",
              maxLength: 255,
              example: "campanha.jpg",
            },
            goal_amount: {
              type: "number",
              minimum: 0,
              example: 1000,
            },
            active: {
              type: "boolean",
              example: true,
            },
          },
        },
        Organizer: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              readOnly: true,
            },
            name: {
              type: "string",
              maxLength: 100,
              example: "Instituto Philia",
            },
            description: {
              type: "string",
              maxLength: 255,
              example: "Organização sem fins lucrativos",
            },
            icon: {
              type: "string",
              maxLength: 10,
              example: "❤️",
            },
            active: {
              type: "boolean",
              example: true,
            },
            created_at: {
              type: "string",
              format: "date-time",
              readOnly: true,
            },
          },
        },
        CreateOrganizer: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              maxLength: 100,
              example: "Instituto Philia",
            },
            description: {
              type: "string",
              maxLength: 255,
              example: "Organização sem fins lucrativos",
            },
            icon: {
              type: "string",
              maxLength: 10,
              example: "❤️",
            },
          },
        },
        UpdateOrganizer: {
          type: "object",
          properties: {
            name: {
              type: "string",
              maxLength: 100,
              example: "Instituto Philia",
            },
            description: {
              type: "string",
              maxLength: 255,
              example: "Organização sem fins lucrativos",
            },
            icon: {
              type: "string",
              maxLength: 10,
              example: "❤️",
            },
            active: {
              type: "boolean",
              example: true,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Erro ao processar solicitação.",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
