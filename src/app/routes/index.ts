import { Router } from "express";
import { EmployeeRoutes } from "../modules/employee/employee.route";
import { DepartmentRoutes } from "../modules/department/department.route";




export const router = Router()

const moduleRoutes = [
    {
        path: "/employees",
        route: EmployeeRoutes
    },
    {
        path: "/department",
        route: DepartmentRoutes
    }
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})