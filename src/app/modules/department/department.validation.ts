import { z } from "zod";


export const createDepartmentBodySchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(60, "Name must not exceed 60 characters"),
    description: z.string().trim().min(1, "Description cannot be empty").max(500, "Description must not exceed 500 characters").optional(),
});





