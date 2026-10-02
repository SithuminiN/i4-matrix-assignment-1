import { Request, Response } from "express";

import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employee.service";
import { handleError } from "../utils/handleError";

// GET ALL EMPLOYEES
export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await getAllEmployees();

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    handleError(error, res, "Failed to fetch employees");
  }
};

// GET ONE EMPLOYEE
export const getEmployee = async (req: Request, res: Response) => {
  try {
    const employeeId = req.params.id as string;

    const employee = await getEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    handleError(error, res, "Failed to fetch employee");
  }
};

// CREATE EMPLOYEE
export const createNewEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const employee = await createEmployee(req.body);

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    handleError(error, res, "Failed to create employee");
  }
};

// UPDATE EMPLOYEE
export const updateExistingEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const employeeId = req.params.id as string;

    const employee = await updateEmployee(
      employeeId,
      req.body
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    handleError(error, res, "Failed to update employee");
  }
};

// DELETE EMPLOYEE
export const deleteExistingEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const employeeId = req.params.id as string;

    const employee = await deleteEmployee(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    handleError(error, res, "Failed to delete employee");
  }
};