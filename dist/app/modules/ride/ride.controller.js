"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const ride_service_1 = require("./ride.service");
const sendResponse_1 = require("../../utils/sendResponse");
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const requestRide = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    const ride = await ride_service_1.rideServer.requestRide(req.body, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Ride Created successfully",
        data: ride,
    });
});
const cancelRide = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    const rideId = req.params.id;
    await ride_service_1.rideServer.cancelRide(rideId, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Your ride successfully cancelled",
        data: null,
    });
});
const myAllRides = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    const rides = await ride_service_1.rideServer.myAllRides(decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "All rides get successfully",
        data: rides,
    });
});
exports.rideController = {
    requestRide,
    cancelRide,
    myAllRides,
};
//# sourceMappingURL=ride.controller.js.map