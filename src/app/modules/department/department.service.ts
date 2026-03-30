import { Department } from "./department.model";
import { IDepartment } from "./department.interface";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { departmentSearchableFields } from "./department.constants";

const createDepartment = async (payload: Partial<IDepartment>) => {
    const department = await Department.create(payload);
    return department;
};

const getDepartments = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Department.find(), query);

    const departmentData = queryBuilder
        .filter()
        .search(departmentSearchableFields)
        .sort()
        .fields()
        .dateSearch()
        .paginate();

    const [data, meta] = await Promise.all([
        departmentData.build(),
        queryBuilder.getMeta(),
    ]);

    return {
        data,
        meta,
    };
};

const getSingleDepartment = async (id: string) => {
    const department = await Department.findById(id);
    if (!department) {
        throw new AppError(httpStatus.NOT_FOUND, "Department not found");
    }
    return department;
};

const deleteDepartment = async (id: string) => {
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
        throw new AppError(httpStatus.NOT_FOUND, "Department not found");
    }
    return department;
};

export const departmentServices = {
    createDepartment,
    getDepartments,
    getSingleDepartment,
    deleteDepartment,
};
