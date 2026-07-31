import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodObject } from "zod";

import { AppError } from "../errors/app-error.js";
import { HttpStatus } from "../constants/http-status.js";

export const validate =
  (schema: ZodObject) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      const zodError = error as ZodError;

      throw new AppError(
        HttpStatus.BAD_REQUEST,
        zodError.issues[0]?.message ?? "Validation failed"
      );
    }
  };