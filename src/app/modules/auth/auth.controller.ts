/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import { setAuthCookies } from "../../utils/setCookies";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { createUserToken } from "../../utils/userTokens";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(httpStatusCode.UNAUTHORIZED, err));
      }
      if (!user) {
        return next(new AppError(httpStatusCode.UNAUTHORIZED, info.message));
      }
      const userTokens = await createUserToken(user);

      const { password: pass, ...rest } = user.toObject();

      setAuthCookies(res, userTokens);

      sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.OK,
        message: "User logged in successfully",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);

const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    const tokenInfo = await authServices.getNewAccessToken(refreshToken);
    setAuthCookies(res, tokenInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "New Token created successfully",
      data: tokenInfo,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "logout successfully",
      data: null,
    });
  }
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;

    await authServices.resetPassword(
      oldPassword,
      newPassword,
      decodedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Password change successfully",
      data: null,
    });
  }
);

export const authController = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
};
