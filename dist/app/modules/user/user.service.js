"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUserService = async (payload) => {
    const { email, password, ...rest } = payload;
    const isUserExist = await user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already Exist");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    if (rest.driver?.driverStatus) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid Payload you can not add driverStatus");
    }
    const user = await user_model_1.User.create({
        email,
        password: hashedPassword,
        ...rest,
    });
    return user;
};
const updateUser = async (userId, payload, decodedToken) => {
    const isUserExist = await user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (isUserExist.isDeleted || isUserExist.isActive === user_interface_1.IsActive.BLOCKED) {
        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.RIDER || decodedToken.role === user_interface_1.Role.DRIVER) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
        }
    }
    if (payload.isActive || payload.isDeleted) {
        if (decodedToken.role === user_interface_1.Role.RIDER) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized");
        }
    }
    if (payload.password) {
        payload.password = await bcryptjs_1.default.hash(payload.password, env_1.envVars.BCRYPT_SALT_ROUND);
    }
    const newUpdatedUser = await user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
};
const getMe = async (decodedToken) => {
    const user = await user_model_1.User.findById(decodedToken.userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (!user?._id?.equals(decodedToken.userId)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not a valid user");
    }
    return user;
};
exports.userService = {
    createUserService,
    updateUser,
    getMe,
};
//# sourceMappingURL=user.service.js.map