import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { employeeSearchableFields } from "./employee.constants";
import { IEmployee } from "./employee.interface";
import { Employee } from "./employee.model";

const createEmployee = async (payload: Partial<IEmployee>) => {
    const employee = await Employee.create(payload);
    return employee;
};

const getEmployees = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Employee.find(), query);

    const employeeData = queryBuilder
        .filter()
        .search(employeeSearchableFields)
        .sort()
        .fields()
        .dateSearch()
        .paginate();

    const [data, meta] = await Promise.all([
        employeeData.build(),
        queryBuilder.getMeta(),
    ]);

    return {
        data,
        meta,
    };
};

const getSingleEmployee = async (id: string) => {
    const employee = await Employee.findById(id);

    if (!employee) {
        throw new AppError(httpStatus.NOT_FOUND, "Employee not found");
    }

    return employee;
};

const updateEmployee = async (id: string, payload: Partial<IEmployee>) => {
    const employee = await Employee.findById(id);

    if (!employee) {
        throw new AppError(httpStatus.NOT_FOUND, "Employee not found");
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return updatedEmployee;
};

const deleteEmployee = async (id: string) => {
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
        throw new AppError(httpStatus.NOT_FOUND, "Employee not found");
    }

    return employee;
};

export const employeeServices = {
    createEmployee,
    getEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
};
