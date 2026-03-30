/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";

import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { departmentServices } from "./department.service";
import { IDepartment } from "./department.interface";

const createDepartment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload: IDepartment = {
        ...req.body,
    };

    const department = await departmentServices.createDepartment(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Department created successfully",
        data: department,
    });
});


const getDepartments = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const departments = await departmentServices.getDepartments(query as Record<string, string>);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All departments retrieved successfully",
        data: departments,
    });
});


const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const department = await departmentServices.getSingleDepartment(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Department retrieved successfully",
        data: department,
    });
});


const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const department = await departmentServices.deleteDepartment(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Department deleted successfully",
        data: department,
    });
});

export const departmentController = {
    createDepartment,
    getDepartments,
    getSingleDepartment,
    deleteDepartment,
};
