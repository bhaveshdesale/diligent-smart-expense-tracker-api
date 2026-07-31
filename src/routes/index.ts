import { Router } from "express";

import { expenseRouter } from "./expense.routes.js";

const router = Router();

router.use("/expenses", expenseRouter);

export { router };
