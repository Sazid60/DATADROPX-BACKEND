import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDepartmentBodySchema } from "./department.validation";
import { departmentController } from "./department.controller";

const router = express.Router();

router.get("/", departmentController.getDepartments);
router.post("/", validateRequest(createDepartmentBodySchema), departmentController.createDepartment);
router.get("/:id", departmentController.getSingleDepartment);
router.delete("/:id", departmentController.deleteDepartment);

export const DepartmentRoutes = router;

