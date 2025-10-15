"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_model_1 = require("../user/user.model");
const userTokens_1 = require("../../utils/userTokens");
const env_1 = require("../../config/env");
const credentialsLogin = async (payload) => {
    const { email, password } = payload;
    const isUserExist = await user_model_1.User.findOne({ email });
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not Found");
    }
    const isPasswordMatched = await bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Incorrect Password");
    }
    const userTokens = (0, userTokens_1.createUserToken)(isUserExist);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject();
    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest,
    };
};
const getNewAccessToken = async (refreshToken) => {
    const accessToken = await (0, userTokens_1.createNewAccessTokenWithRefreshToken)(refreshToken);
    return {
        accessToken,
    };
};
const resetPassword = async (oldPassword, newPassword, decodedToken) => {
    const user = await user_model_1.User.findById(decodedToken.userId);
    const isOldPasswordMatch = await bcryptjs_1.default.compare(oldPassword, user?.password);
    if (isOldPasswordMatch) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Old Password does not match");
    }
    user.password = await bcryptjs_1.default.hash(newPassword, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    user?.save();
};
exports.authServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword,
};
//# sourceMappingURL=auth.service.js.map