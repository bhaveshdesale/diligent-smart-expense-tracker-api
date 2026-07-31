import type { Request, Response } from "express";

import { HttpStatus } from "../constants/http-status.js";
import { sendSuccess } from "../utils/send-success.js";

export const healthController = {
  checkHealth(_req: Request, res: Response) {
    sendSuccess(res, {
      statusCode: HttpStatus.OK,
      message: "API is running",
    });
  },
};
