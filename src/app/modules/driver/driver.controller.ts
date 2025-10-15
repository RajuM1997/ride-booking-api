import httpStatus from "http-status-codes";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { driverService } from "./driver.service";
import { verifyToken } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { sendResponse } from "../../utils/sendResponse";

const approveDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    await driverService.approveDriver(
      rideId as string,
      decodedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Your ride ready for you",
      data: null,
    });
  }
);

const updateRideStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    await driverService.updateRideStatus(
      rideId as string,
      decodedToken as JwtPayload,
      req.body
    );
    const currentStatus = req.body.status;
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Status updated successfully and the current status is ${currentStatus}`,
      data: null,
    });
  }
);

const cancelRideDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rideId = req.params.id;
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    await driverService.cancelRideDriver(
      rideId as string,
      decodedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Your ride successfully cancelled`,
      data: null,
    });
  }
);

const updateDriverAvailability = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    await driverService.updateDriverAvailability(
      decodedToken as JwtPayload,
      req.body
    );
    const currentStatus = req.body.isAvailability;
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Availability updated successfully and the current Availability is ${currentStatus}`,
      data: null,
    });
  }
);

const totalCompleteRideAndEarning = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    const driverInfo = await driverService.totalCompleteRideAndEarning(
      decodedToken as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Driver payment and completed ride get successfully`,
      data: driverInfo,
    });
  }
);

export const driverControllers = {
  approveDriver,
  updateRideStatus,
  totalCompleteRideAndEarning,
  updateDriverAvailability,
  cancelRideDriver,
};
