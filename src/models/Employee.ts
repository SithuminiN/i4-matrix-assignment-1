import { Schema, model, Document } from "mongoose";

export type EmployeeStatus = "ACTIVE" | "INACTIVE";

export interface IEmployee extends Document {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: EmployeeStatus;
 
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "ACTIVE" },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Employee = model<IEmployee>("Employee", employeeSchema);
