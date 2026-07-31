import { AppError } from "../errors/app-error.js";
import { HttpStatus } from "../constants/http-status.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

import { expenseRepository } from "../repositories/expense.repository.js";

import type { CreateExpenseDto } from "../schemas/expense.schema.js";

export class ExpenseService {
  async createExpense(data: CreateExpenseDto) {
    return expenseRepository.create(data);
  }

  async getExpenses(category?: string) {
    const expenses = await expenseRepository.getAll();

    if (!category) {
      return expenses;
    }

    return expenses.filter(
      (expense) => expense.category.toLowerCase() === category.toLowerCase(),
    );
  }

  async getTotalExpenses(category?: string) {
    const expenses = await this.getExpenses(category);

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    return {
      total,
      category: category ?? "All",
    };
  }

  async deleteExpense(id: string) {
    const deleted = await expenseRepository.delete(id);

    if (!deleted) {
      throw new AppError(
        HttpStatus.NOT_FOUND,
        ERROR_MESSAGES.EXPENSE_NOT_FOUND,
      );
    }
  }
}

export const expenseService = new ExpenseService();
