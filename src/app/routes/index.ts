import { Router } from "express";



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