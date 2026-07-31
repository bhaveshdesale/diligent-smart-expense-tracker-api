export const SUCCESS_MESSAGES = {
  API_RUNNING: "Smart Expense Tracker API is running",

  EXPENSE_CREATED: "Expense created successfully",

  EXPENSE_FETCHED: "Expenses fetched successfully",

  EXPENSE_DELETED: "Expense deleted successfully",

  TOTAL_FETCHED: "Expense total calculated successfully",
} as const;

export const ERROR_MESSAGES = {
  VALIDATION_FAILED: "Validation failed",

  EXPENSE_NOT_FOUND: "Expense not found",

  INTERNAL_SERVER_ERROR: "Internal server error",

  ROUTE_NOT_FOUND: "Route not found",
} as const;
