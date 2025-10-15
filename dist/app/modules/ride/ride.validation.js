"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRideZodSchema = exports.requestRideZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ride_interface_1 = require("./ride.interface");
const driver_interface_1 = require("../driver/driver.interface");
exports.requestRideZodSchema = zod_1.default.object({
    rider: zod_1.default.string().optional(),
    driver: zod_1.default.string().optional(),
    pickup: zod_1.default
        .string("Pickup must be string")
        .min(2, { message: "Pickup must be at least 5 characters long. " })
        .max(50, { message: "Pickup cannot exceed 100 characters." }),
    destination: zod_1.default
        .string({ message: "Destination must be  string" })
        .min(5, { message: "Destination must be at least 5 characters long." })
        .max(100, { message: "Destination cannot exceed 100 characters." }),
    status: zod_1.default.enum(Object.values(ride_interface_1.IRideStatus)).optional(),
    fare: zod_1.default.coerce.number({ message: "Fire must be  number" }),
    driverRideStatus: zod_1.default
        .enum(Object.values(driver_interface_1.DriverRideStatus))
        .optional(),
    currentStatus: zod_1.default
        .array(zod_1.default.object({
        status: zod_1.default.string(),
        currentTimeTamp: zod_1.default.date().optional(),
    }))
        .optional(),
});
exports.updateRideZodSchema = zod_1.default.object({
    rider: zod_1.default.string().optional(),
    driver: zod_1.default.string().optional(),
    pickup: zod_1.default
        .string("Pickup must be string")
        .min(2, { message: "Pickup must be at least 5 characters long. " })
        .max(50, { message: "Pickup cannot exceed 100 characters." })
        .optional(),
    destination: zod_1.default
        .string({ message: "Destination must be  string" })
        .min(5, { message: "Destination must be at least 5 characters long." })
        .max(100, { message: "Destination cannot exceed 100 characters." }),
    status: zod_1.default.enum(Object.values(ride_interface_1.IRideStatus)).optional(),
    fare: zod_1.default.coerce.number({ message: "Fire must be  number" }).optional(),
    driverRideStatus: zod_1.default
        .enum(Object.values(driver_interface_1.DriverRideStatus))
        .optional(),
    currentStatus: zod_1.default
        .array(zod_1.default.object({
        status: zod_1.default.string(),
        currentTimeTamp: zod_1.default.date().optional(),
    }))
        .optional(),
});
//# sourceMappingURL=ride.validation.js.map