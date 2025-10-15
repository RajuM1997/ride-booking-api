"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const createUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const user = await user_service_1.userService.createUserService(req.body);
    let role;
    if (req.body.driver) {
        role = "Driver";
    }
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: role
            ? `Your ${role} profile created successfully. Please wait for admin response`
            : "Your account created successfully",
        data: user,
    });
});
const updateUser = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    const user = await user_service_1.userService.updateUser(userId, req.body, verifiedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Your profile updated successfully",
        data: user,
    });
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const token = req.headers.authorization;
    const verifiedToken = (0, jwt_1.verifyToken)(token, env_1.envVars.JWT_ACCESS_SECRET);
    const user = await user_service_1.userService.getMe(verifiedToken);
    const { password, ...rest } = user.toObject();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "your profile successfully get",
        data: rest,
    });
});
exports.userController = {
    createUser,
    updateUser,
    getMe,
};
//# sourceMappingURL=user.controller.js.map