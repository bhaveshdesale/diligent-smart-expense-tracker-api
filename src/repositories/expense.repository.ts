import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

import type { Expense } from "../types/expense.types.js";
import { env } from "../config/env.js";

const DATA_FILE = path.resolve(env.DATA_FILE);

export class ExpenseRepository {
  private async readExpenses(): Promise<Expense[]> {
    const fileContent = await fs.readFile(DATA_FILE, "utf-8");

    return JSON.parse(fileContent) as Expense[];
  }

  private async writeExpenses(expenses: Expense[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(expenses, null, 2));
  }

  async getAll(): Promise<Expense[]> {
    return this.readExpenses();
  }

  async create(expense: Omit<Expense, "id">): Promise<Expense> {
    const expenses = await this.readExpenses();

    const newExpense: Expense = {
      id: randomUUID(),
      ...expense,
    };

    expenses.push(newExpense);

    await this.writeExpenses(expenses);

    return newExpense;
  }

  async delete(id: string): Promise<boolean> {
    const expenses = await this.readExpenses();

    const filteredExpenses = expenses.filter((expense) => expense.id !== id);

    if (filteredExpenses.length === expenses.length) {
      return false;
    }

    await this.writeExpenses(filteredExpenses);

    return true;
  }
}

export const expenseRepository = new ExpenseRepository();
