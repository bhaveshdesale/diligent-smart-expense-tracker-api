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

    date: z.string().date("Invalid date format"),
  }),
});

export type CreateExpenseDto =
  z.infer<typeof createExpenseSchema>["body"];