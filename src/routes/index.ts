import { Router } from "express";

import { expenseRouter } from "./expense.routes.js";
import { healthRouter } from "./health.routes.js";

const router = Router();

router.use(healthRouter);
router.use("/expenses", expenseRouter);

export { router };
