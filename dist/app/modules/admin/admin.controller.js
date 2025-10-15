"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const sendResponse_1 = require("../../utils/sendResponse");
const acceptDriver = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const driverId = req.params.id;
    await admin_service_1.adminService.acceptDriver(driverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `New driver added successfully`,
        data: null,
    });
});
const removeDriverRole = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const driverId = req.params.id;
    await admin_service_1.adminService.removeDriverRole(driverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Driver role removed successfully`,
        data: null,
    });
});
const suspendDriver = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const driverId = req.params.id;
    await admin_service_1.adminService.suspendDriver(driverId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Driver suspend successfully`,
        data: null,
    });
});
const blockUnblockUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.params.id;
    const activeStatus = req.body.isActive;
    await admin_service_1.adminService.blockUnblockUser(userId, activeStatus);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `User activity updated successfully`,
        data: null,
    });
});
const getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const query = req.query;
    const { data, meta } = await admin_service_1.adminService.getAllUsers(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: `All rides get successfully`,
        meta: meta,
        data: data,
    });
});
const getAllRides = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const query = req.query;
    const { data, meta } = await admin_service_1.adminService.getAllRides(query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: `All rides get successfully`,
        meta: meta,
        data: data,
    });
});
const getAllDrivers = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const drivers = await admin_service_1.adminService.getAllDrivers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: `All rides get successfully`,
        data: drivers,
    });
});
exports.adminController = {
    acceptDriver,
    removeDriverRole,
    getAllRides,
    getAllUsers,
    suspendDriver,
    blockUnblockUser,
    getAllDrivers,
};
//# sourceMappingURL=admin.controller.js.map