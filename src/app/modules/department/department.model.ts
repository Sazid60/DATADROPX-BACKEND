import { Schema, model } from "mongoose";
import { IDepartment } from "./department.interface";

const departmentSchema = new Schema<IDepartment>(
    {
        name: {
            type: String,
            required: [true, "Department name is required"],
            unique: true,
            trim: true,
            minlength: [2, "Department name must be at least 2 characters long"],
            maxlength: [60, "Department name must not exceed 60 characters"],
        },
        description: {
            type: String,
            required: false,
            trim: true,
            maxlength: [500, "Department description must not exceed 500 characters"],
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Department = model<IDepartment>("Department", departmentSchema);

