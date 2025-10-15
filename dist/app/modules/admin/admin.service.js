"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_interface_1 = require("../user/user.interface");
const ride_model_1 = require("../ride/ride.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const admin_constant_1 = require("./admin.constant");
const driver_interface_1 = require("../driver/driver.interface");
const acceptDriver = async (userId) => {
    const existingDriver = await user_model_1.User.findById(userId);
    if (!existingDriver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (existingDriver.role === user_interface_1.Role.DRIVER) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User already driver");
    }
    if (existingDriver.isActive === user_interface_1.IsActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This user blocked so you can not change status here");
    }
    await user_model_1.User.findByIdAndUpdate(userId, { role: "DRIVER", "driver.driverStatus": driver_interface_1.DriverStatus.APPROVE }, { new: true, runValidators: true });
};
const removeDriverRole = async (userId) => {
    const existingDriver = await user_model_1.User.findById(userId);
    if (!existingDriver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (existingDriver.role !== user_interface_1.Role.DRIVER) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This user not a driver");
    }
    if (existingDriver.isActive === user_interface_1.IsActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This user blocked so you can not change status");
    }
    await user_model_1.User.findByIdAndUpdate(userId, { role: "RIDER" }, { new: true, runValidators: true });
};
const suspendDriver = async (userId) => {
    const existingDriver = await user_model_1.User.findById(userId);
    if (!existingDriver) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (existingDriver.role !== user_interface_1.Role.DRIVER) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This user not a driver");
    }
    if (existingDriver.isActive === user_interface_1.IsActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This user blocked so you can not change status");
    }
    await user_model_1.User.findByIdAndUpdate(userId, { "driver.driverStatus": driver_interface_1.DriverStatus.SUSPEND }, { new: true, runValidators: true });
};
const blockUnblockUser = async (userId, activeStatus) => {
    const existingUser = await user_model_1.User.findById(userId);
    if (!existingUser) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    await user_model_1.User.findByIdAndUpdate(userId, { isActive: activeStatus }, { new: true, runValidators: true });
};
const getAllUsers = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
    const users = queryBuilder
        .search(admin_constant_1.userEmailSearchableFiends)
        .filter()
        .sort()
        .paginate();
    const [data, meta] = await Promise.all([
        users.build(),
        queryBuilder.getMeta(),
    ]);
    return { data, meta };
};
const getAllRides = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(ride_model_1.Ride.find(), query);
    const rides = queryBuilder.filter().paginate();
    const [data, meta] = await Promise.all([
        rides.build(),
        queryBuilder.getMeta(),
    ]);
    return { data, meta };
};
const getAllDrivers = async () => {
    const drivers = user_model_1.User.find({ role: "DRIVER" });
    return drivers;
};
exports.adminService = {
    getAllUsers,
    getAllRides,
    getAllDrivers,
    acceptDriver,
    removeDriverRole,
    suspendDriver,
    blockUnblockUser,
};
//# sourceMappingURL=admin.service.js.map