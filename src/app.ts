import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employee.routes";
import { notFound, errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Employee Management API is running" });
});

app.use("/api/employees", employeeRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
