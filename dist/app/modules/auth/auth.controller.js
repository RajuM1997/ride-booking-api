"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const setCookies_1 = require("../../utils/setCookies");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const passport_1 = __importDefault(require("passport"));
const userTokens_1 = require("../../utils/userTokens");
const credentialsLogin = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    passport_1.default.authenticate("local", async (err, user, info) => {
        if (err) {
            return next(new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, err));
        }
        if (!user) {
            return next(new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, info.message));
        }
        const userTokens = await (0, userTokens_1.createUserToken)(user);
        const { password: pass, ...rest } = user.toObject();
        (0, setCookies_1.setAuthCookies)(res, userTokens);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.OK,
            message: "User logged in successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest,
            },
        });
    })(req, res, next);
});
const getNewAccessToken = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    const tokenInfo = await auth_service_1.authServices.getNewAccessToken(refreshToken);
    (0, setCookies_1.setAuthCookies)(res, tokenInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "New Token created successfully",
        data: tokenInfo,
    });
});
const logout = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "logout successfully",
        data: null,
    });
});
const resetPassword = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    await auth_service_1.authServices.resetPassword(oldPassword, newPassword, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Password change successfully",
        data: null,
    });
});
exports.authController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
};
//# sourceMappingURL=auth.controller.js.map