import express from "express";
import employeeRoutes from "./routes/employee.routes";

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;