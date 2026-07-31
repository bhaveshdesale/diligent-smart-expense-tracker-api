import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Expense Tracker API",
      version: "1.0.0",
      description:
        "REST API for managing personal expenses built with Express, TypeScript, and JSON storage.",
    },

    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development Server",
      },
    ],

    components: {
      schemas: {
        Expense: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              example: "Pizza",
            },
            amount: {
              type: "number",
              example: 250,
            },
            category: {
              type: "string",
              example: "Food",
            },
            date: {
              type: "string",
              format: "date",
              example: "2026-07-31",
            },
          },
        },
      },
    },
  },

  apis: ["src/routes/*.ts"],
};

export default swaggerJSDoc(options);
