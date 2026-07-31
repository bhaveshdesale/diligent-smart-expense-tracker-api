import type { NextFunction, Request, Response } from "express";

import { HttpStatus } from "../constants/http-status.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

export function notFoundMiddleware(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: ERROR_MESSAGES.ROUTE_NOT_FOUND,
    path: req.originalUrl,
  });
}