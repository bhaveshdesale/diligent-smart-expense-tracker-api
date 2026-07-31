import { Router } from "express";

import { healthController } from "../controllers/health.controller.js";

const healthRouter = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running successfully
 */

healthRouter.get("/health", healthController.checkHealth);

export { healthRouter };
