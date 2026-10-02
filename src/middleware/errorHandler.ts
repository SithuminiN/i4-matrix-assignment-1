import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { sendError } from "../utils/response";

export const notFound = (req: Request, res: Response) =>
  sendError(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) return sendError(res, err.statusCode, err.message);

  // Duplicate email (MongoDB unique index)
  if (err?.code === 11000) return sendError(res, 400, "Email already exists");

  // Mongoose validation error
  if (err?.name === "ValidationError") {
    return sendError(res, 400, "Validation failed", Object.values(err.errors).map((e: any) => e.message));
  }

  // Invalid JSON body
  if (err?.type === "entity.parse.failed") return sendError(res, 400, "Invalid JSON body");

  console.error(err);
  return sendError(res, 500, "Internal server error");
};
