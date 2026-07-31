import type { Request, Response } from "express";

import { asyncHandler } from "../utils/async-handler.js";
import { sendSuccess } from "../utils/send-success.js";

import { HttpStatus } from "../constants/http-status.js";
import { SUCCESS_MESSAGES } from "../constants/messages.js";

import { expenseService } from "../services/expense.service.js";

export const expenseController = {
  createExpense: asyncHandler(async (req: Request, res: Response) => {
    const expense = await expenseService.createExpense(req.body);

    sendSuccess(res, {
      statusCode: HttpStatus.CREATED,
      message: SUCCESS_MESSAGES.EXPENSE_CREATED,
      data: expense,
    });
  }),

  getExpenses: asyncHandler(async (req: Request, res: Response) => {
    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;

    const expenses = await expenseService.getExpenses(category);

    sendSuccess(res, {
      statusCode: HttpStatus.OK,
      message: SUCCESS_MESSAGES.EXPENSE_FETCHED,
      data: expenses,
    });
  }),

  getExpenseTotal: asyncHandler(async (req: Request, res: Response) => {
    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;

    const total = await expenseService.getTotalExpenses(category);

    sendSuccess(res, {
      statusCode: HttpStatus.OK,
      message: SUCCESS_MESSAGES.TOTAL_FETCHED,
      data: total,
    });
  }),

  deleteExpense: asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await expenseService.deleteExpense(id);

    sendSuccess(res, {
      statusCode: HttpStatus.OK,
      message: SUCCESS_MESSAGES.EXPENSE_DELETED,
    });
  }),
};
