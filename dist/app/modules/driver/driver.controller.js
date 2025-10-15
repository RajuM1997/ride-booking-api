"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const driver_service_1 = require("./driver.service");
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const sendResponse_1 = require("../../utils/sendResponse");
const approveDriver = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const rideId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    await driver_service_1.driverService.approveDriver(rideId, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Your ride ready for you",
        data: null,
    });
});
const updateRideStatus = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const rideId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    await driver_service_1.driverService.updateRideStatus(rideId, decodedToken, req.body);
    const currentStatus = req.body.status;
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Status updated successfully and the current status is ${currentStatus}`,
        data: null,
    });
});
const cancelRideDriver = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const rideId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    await driver_service_1.driverService.cancelRideDriver(rideId, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Your ride successfully cancelled`,
        data: null,
    });
});
const updateDriverAvailability = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    await driver_service_1.driverService.updateDriverAvailability(decodedToken, req.body);
    const currentStatus = req.body.isAvailability;
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: `Availability updated successfully and the current Availability is ${currentStatus}`,
        data: null,
    });
});
const totalCompleteRideAndEarning = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    const driverInfo = await driver_service_1.driverService.totalCompleteRideAndEarning(decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: `Driver payment and completed ride get successfully`,
        data: driverInfo,
    });
});
exports.driverControllers = {
    approveDriver,
    updateRideStatus,
    totalCompleteRideAndEarning,
    updateDriverAvailability,
    cancelRideDriver,
};
//# sourceMappingURL=driver.controller.js.map