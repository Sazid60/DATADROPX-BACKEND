import { Router } from "express";
import { EmployeeRoutes } from "../modules/employee/employee.route";




export const router = Router()

const moduleRoutes = [
    {
        path: "/employees",
        route: EmployeeRoutes
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})