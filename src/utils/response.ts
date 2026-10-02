import { Response } from "express";

export const sendSuccess = (res: Response, status: number, message: string, data: unknown = null) =>
  res.status(status).json({ success: true, message, data });

export const sendError = (res: Response, status: number, message: string, errors?: string[]) =>
  res.status(status).json({ success: false, message, ...(errors ? { errors } : {}) });
