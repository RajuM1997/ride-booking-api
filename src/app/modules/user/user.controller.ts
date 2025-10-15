/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUserService(req.body);
    let role;
    if (req.body.driver) {
      role = "Driver";
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: role
        ? `Your ${role} profile created successfully. Please wait for admin response`
        : "Your account created successfully",
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );
    const user = await userService.updateUser(
      userId as string,
      req.body,
      verifiedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "Your profile updated successfully",
      data: user,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const verifiedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );
    const user = await userService.getMe(verifiedToken as JwtPayload);
    const { password, ...rest } = user.toObject();
    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "your profile successfully get",
      data: rest,
    });
  }
);

export const userController = {
  createUser,
  updateUser,
  getMe,
};
