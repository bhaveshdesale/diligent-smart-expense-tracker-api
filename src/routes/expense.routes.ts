import { Router } from "express";

import { expenseController } from "../controllers/expense.controller.js";
import { validate } from "../middlewares/validation.middleware.js";

import {
  createExpenseSchema,
  deleteExpenseSchema,
  getExpenseTotalSchema,
  getExpensesSchema,
} from "../schemas/expense.schema.js";

const expenseRouter = Router();

expenseRouter.post(
  "/",
  validate(createExpenseSchema),
  expenseController.createExpense,
);

expenseRouter.get(
  "/",
  validate(getExpensesSchema),
  expenseController.getExpenses,
);

expenseRouter.get(
  "/total",
  validate(getExpenseTotalSchema),
  expenseController.getExpenseTotal,
);

expenseRouter.delete(
  "/:id",
  validate(deleteExpenseSchema),
  expenseController.deleteExpense,
);

export { expenseRouter };
