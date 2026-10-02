import { Response } from "express";
import mongoose from "mongoose";

export const handleError = (
  error: unknown,
  res: Response,
  fallbackMessage: string
) => {
  // Missing / invalid fields (required, enum, etc.)
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(error.errors).map((e) => e.message),
    });
  }

  // Malformed ObjectId in /:id
  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
  }

  // Duplicate email (unique index)
  if ((error as { code?: number })?.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  console.error(fallbackMessage, error);

  return res.status(500).json({
    success: false,
    message: fallbackMessage,
  });
};
