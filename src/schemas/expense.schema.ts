import { z } from "zod";

export const createExpenseSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters"),

    amount: z
      .number()
      .positive("Amount must be greater than zero"),

    category: z
      .string()
      .trim()
      .min(1, "Category is required")
      .max(50, "Category cannot exceed 50 characters"),

    date: z.iso.date({
      message: "Invalid date format. Expected YYYY-MM-DD",
    }),
  }),
});

export const deleteExpenseSchema = z.object({
  params: z.object({
    id: z.uuid("Invalid expense ID"),
  }),
});

export const getExpensesSchema = z.object({
  query: z.object({
    category: z.string().trim().optional(),
  }),
});

export const getExpenseTotalSchema = z.object({
  query: z.object({
    category: z.string().trim().optional(),
  }),
});

export type CreateExpenseDto =
  z.infer<typeof createExpenseSchema>["body"];