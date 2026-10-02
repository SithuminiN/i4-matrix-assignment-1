import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

const REQUIRED = ["name", "email", "phone", "department", "position" ] as const;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const check = (body: Record<string, unknown>, requireAll: boolean): string[] => {
  const errors: string[] = [];

  for (const field of REQUIRED) {
    const value = body[field];
    if (value === undefined) {
      if (requireAll) errors.push(`${field} is required`);
      continue;
    }
    if (typeof value !== "string" || value.trim() === "") {
      errors.push(`${field} must be a non-empty string`);
    }
  }

  if (typeof body.email === "string" && body.email.trim() !== "" && !EMAIL_REGEX.test(body.email)) {
    errors.push("email is not valid");
  }

  if (body.status !== undefined && body.status !== "ACTIVE" && body.status !== "INACTIVE") {
    errors.push("status must be ACTIVE or INACTIVE");
  }

  return errors;
};

export const validateCreate = (req: Request, res: Response, next: NextFunction) => {
  const errors = check(req.body ?? {}, true);
  if (errors.length) return sendError(res, 400, "Validation failed", errors);
  next();
};

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body ?? {};
  if (Object.keys(body).length === 0) return sendError(res, 400, "Request body cannot be empty");
  const errors = check(body, false);
  if (errors.length) return sendError(res, 400, "Validation failed", errors);
  next();
};
