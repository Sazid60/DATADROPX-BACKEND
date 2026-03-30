/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IEmployee } from "./employee.interface";
import { employeeServices } from "./employee.service";

const createEmployee = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
	const payload: IEmployee = {
		...req.body,
	};

	const employee = await employeeServices.createEmployee(payload);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Employee created successfully",
		data: employee,
	});
});

const getEmployees = catchAsync(async (req: Request, res: Response) => {
	const query = req.query;
	const employees = await employeeServices.getEmployees(query as Record<string, string>);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "All employees retrieved successfully",
		data: employees,
	});
});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const employee = await employeeServices.getSingleEmployee(id);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Employee retrieved successfully",
		data: employee,
	});
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const payload = req.body as Partial<IEmployee>;

	const employee = await employeeServices.updateEmployee(id, payload);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Employee updated successfully",
		data: employee,
	});
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params as { id: string };
	const employee = await employeeServices.deleteEmployee(id);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Employee deleted successfully",
		data: employee,
	});
});

export const employeeController = {
	createEmployee,
	getEmployees,
	getSingleEmployee,
	updateEmployee,
	deleteEmployee,
};
