import express from "express";

const router = express.Router();


router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee route is working"
    });
});


export const EmployeeRoutes = router;
