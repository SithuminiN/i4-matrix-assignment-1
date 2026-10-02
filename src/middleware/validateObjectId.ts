import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendError } from "../utils/response";

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return sendError(res, 400, "Invalid employee ID");
  }
  next();
};
