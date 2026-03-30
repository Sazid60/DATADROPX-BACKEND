import { Schema, model } from "mongoose";
import { IEmployee } from "./employee.interface";

const employeeSchema = new Schema<IEmployee>(
    {
        name: {
            type: String,
            required: [true, "Employee name is required"],
            trim: true,
            minlength: [2, "Employee name must be at least 2 characters long"],
            maxlength: [80, "Employee name must not exceed 80 characters"],
        },
        email: {
            type: String,
            required: [true, "Employee email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        position: {
            type: String,
            required: [true, "Position is required"],
            trim: true,
            maxlength: [80, "Position must not exceed 80 characters"],
        },
        department: {
            type: String,
            required: [true, "Department is required"],
            trim: true,
            maxlength: [80, "Department must not exceed 80 characters"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Employee = model<IEmployee>("Employee", employeeSchema);
