import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { employeeController } from "./employee.controller";
import { createEmployeeBodySchema, updateEmployeeBodySchema } from "./employee.validation";

const router = express.Router();

router.get("/", employeeController.getEmployees);
router.post("/", validateRequest(createEmployeeBodySchema), employeeController.createEmployee);
router.get("/:id", employeeController.getSingleEmployee);
router.put("/:id", validateRequest(updateEmployeeBodySchema), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);


export const EmployeeRoutes = router;
