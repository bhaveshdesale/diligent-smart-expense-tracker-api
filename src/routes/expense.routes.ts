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

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Validation failed
 */
expenseRouter.post(
  "/",
  validate(createExpenseSchema),
  expenseController.createExpense,
);

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter expenses by category
 *     responses:
 *       200:
 *         description: List of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 */
expenseRouter.get(
  "/",
  validate(getExpensesSchema),
  expenseController.getExpenses,
);

/**
 * @swagger
 * /expenses/total:
 *   get:
 *     summary: Calculate total expenses
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Calculate total for a specific category
 *     responses:
 *       200:
 *         description: Total amount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 750
 */
expenseRouter.get(
  "/total",
  validate(getExpenseTotalSchema),
  expenseController.getExpenseTotal,
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Expense ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
expenseRouter.delete(
  "/:id",
  validate(deleteExpenseSchema),
  expenseController.deleteExpense,
);

export { expenseRouter };
