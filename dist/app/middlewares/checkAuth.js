"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const env_1 = require("../config/env");
const user_model_1 = require("../modules/user/user.model");
const user_interface_1 = require("../modules/user/user.interface");
const jwt_1 = require("../utils/jwt");
const driver_interface_1 = require("../modules/driver/driver.interface");
const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "No Token Received");
        }
        const verifiedRefreshToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        const isUserExist = await user_model_1.User.findOne({
            email: verifiedRefreshToken.email,
        });
        if (!accessToken) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "No token found");
        }
        if (!isUserExist) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not Found");
        }
        if (isUserExist.isActive === user_interface_1.IsActive.BLOCKED) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User is deleted");
        }
        const verifiedToken = jsonwebtoken_1.default.verify(accessToken, env_1.envVars.JWT_ACCESS_SECRET);
        if (!verifiedToken) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not authorized");
        }
        if (isUserExist.role === user_interface_1.Role.DRIVER) {
            if (!isUserExist.driver) {
                throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Please complete Your Profile");
            }
            if (isUserExist.driver.driverStatus === driver_interface_1.DriverStatus.SUSPEND) {
                throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not verified driver");
            }
            if (!isUserExist.driver.licenseNumber) {
                throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Please complete Your Profile");
            }
            if (!isUserExist.driver.vehicleType) {
                throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Please complete Your Profile");
            }
            if (!isUserExist.driver.vehicleNumber) {
                throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Please complete Your Profile");
            }
            if (isUserExist.driver.isAvailability !== driver_interface_1.IsAvailability.ONLINE) {
                throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not online so you can not book a ride");
            }
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "You are not permitted to view this route!!");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map