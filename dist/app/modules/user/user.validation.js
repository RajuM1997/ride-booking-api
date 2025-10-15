"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
const driver_interface_1 = require("../driver/driver.interface");
exports.createUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string("Name must be string")
        .min(2, { message: "Name must be at least 2 characters long. " })
        .max(50, { message: "Name cannot exceed 50 characters." }),
    email: zod_1.default
        .string({ message: "Email must be  string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: zod_1.default
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one digit")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/, "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXXX")
        .optional(),
    address: zod_1.default
        .string({ message: "Address must be  string" })
        .max(200, { message: "Address cannot exceed 100 characters." })
        .optional(),
    driver: zod_1.default
        .object({
        licenseNumber: zod_1.default.string({ message: "license number must be  string" }),
        vehicleType: zod_1.default.string({ message: "vehicle type must be  string" }),
        vehicleNumber: zod_1.default.string({ message: "vehicle number must be  string" }),
        rating: zod_1.default.number({ message: "rating must be  number" }).optional(),
        completedRides: zod_1.default
            .number({ message: "completed rides must be number" })
            .optional(),
        isAvailability: zod_1.default
            .enum(Object.values(driver_interface_1.IsAvailability))
            .optional(),
        driverStatus: zod_1.default.enum(Object.values(driver_interface_1.DriverStatus)).optional(),
        totalEarning: zod_1.default
            .number({ message: "total earning must be number" })
            .optional(),
        rideCapability: zod_1.default
            .boolean({ message: "ride capability must be boolean" })
            .optional(),
    })
        .optional(),
    rider: zod_1.default
        .object({
        paymentMethod: zod_1.default
            .enum(Object.values(user_interface_1.IPaymentMethod))
            .optional(),
        rideHistory: zod_1.default.array(zod_1.default.string()).optional(),
    })
        .optional(),
});
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long. " })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .optional(),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/, "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXXX")
        .optional(),
    isDeleted: zod_1.default
        .boolean({ message: "isDeleted must be true or false" })
        .optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.IsActive)).optional(),
    isVerified: zod_1.default
        .boolean({ message: "isVerified must be true or false" })
        .optional(),
    address: zod_1.default
        .string({ message: "Address must be  string" })
        .max(200, { message: "Address cannot exceed 100 characters." })
        .optional(),
    driver: zod_1.default
        .object({
        licenseNumber: zod_1.default
            .string({ message: "license number must be  string" })
            .optional(),
        vehicleType: zod_1.default
            .string({ message: "vehicle type must be  string" })
            .optional(),
        vehicleNumber: zod_1.default
            .string({ message: "vehicle number must be  string" })
            .optional(),
        rating: zod_1.default.number({ message: "rating must be  number" }).optional(),
        completedRides: zod_1.default
            .number({ message: "completed rides must be number" })
            .optional(),
        isAvailability: zod_1.default
            .enum(Object.values(driver_interface_1.IsAvailability))
            .optional(),
        driverStatus: zod_1.default.enum(Object.values(driver_interface_1.DriverStatus)).optional(),
        totalEarning: zod_1.default
            .number({ message: "total earning must be number" })
            .optional(),
        rideCapability: zod_1.default
            .boolean({ message: "ride capability must be boolean" })
            .optional(),
    })
        .optional(),
    rider: zod_1.default
        .object({
        paymentMethod: zod_1.default
            .enum(Object.values(user_interface_1.IPaymentMethod))
            .optional(),
        rideHistory: zod_1.default.array(zod_1.default.string()).optional(),
    })
        .optional(),
});
//# sourceMappingURL=user.validation.js.map