import { Request, Response, NextFunction } from "express";
import * as service from "../services/employee.service";
import { sendSuccess } from "../utils/response";
import { AppError } from "../utils/AppError";

export const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await service.getAllEmployees();
    sendSuccess(res, 200, "Employees fetched successfully", employees);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await service.getEmployeeById(req.params.id);
    if (!employee) throw new AppError(404, "Employee not found");
    sendSuccess(res, 200, "Employee fetched successfully", employee);
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await service.createEmployee(req.body);
    sendSuccess(res, 201, "Employee created successfully", employee);
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await service.updateEmployee(req.params.id, req.body);
    if (!employee) throw new AppError(404, "Employee not found");
    sendSuccess(res, 200, "Employee updated successfully", employee);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employee = await service.deleteEmployee(req.params.id);
    if (!employee) throw new AppError(404, "Employee not found");
    sendSuccess(res, 200, "Employee deleted successfully", null);
  } catch (err) {
    next(err);
  }
};
