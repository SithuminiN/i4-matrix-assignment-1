import { Employee, IEmployee } from "../models/Employee";

export type EmployeeInput = Partial<Pick<IEmployee, "name" | "email" | "phone" | "department" | "position" |"status">>;

export const getAllEmployees = () => Employee.find().sort({ createdAt: -1 });

export const getEmployeeById = (id: string) => Employee.findById(id);

export const createEmployee = (data: EmployeeInput) => Employee.create(data);

export const updateEmployee = (id: string, data: EmployeeInput) =>
  Employee.findByIdAndUpdate(id, data, { new: true, runValidators: true });

export const deleteEmployee = (id: string) => Employee.findByIdAndDelete(id);
