import { z } from "zod";

export const createEmployeeBodySchema = z.object({
	name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name must not exceed 80 characters"),
	email: z.string().trim().email("Invalid email address"),
	position: z.string().trim().min(2, "Position must be at least 2 characters").max(80, "Position must not exceed 80 characters"),
	department: z.string().trim().min(2, "Department must be at least 2 characters").max(80, "Department must not exceed 80 characters"),
});

export const updateEmployeeBodySchema = z.object({
	name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name must not exceed 80 characters").optional(),
	email: z.string().trim().email("Invalid email address").optional(),
	position: z.string().trim().min(2, "Position must be at least 2 characters").max(80, "Position must not exceed 80 characters").optional(),
	department: z.string().trim().min(2, "Department must be at least 2 characters").max(80, "Department must not exceed 80 characters").optional(),
});
