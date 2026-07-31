import type { Response } from "express";

interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export function sendSuccess<T>(
  res: Response,
  { statusCode, message, data }: SuccessResponse<T>
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}