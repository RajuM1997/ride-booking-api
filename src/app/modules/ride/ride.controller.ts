/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatusCode from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { rideServer } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const requestRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    const ride = await rideServer.requestRide(
      req.body,
      decodedToken as JwtPayload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Ride Created successfully",
      data: ride,
    });
  }
);

const cancelRide = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    const rideId = req.params.id;
    await rideServer.cancelRide(rideId as string, decodedToken as JwtPayload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Your ride successfully cancelled",
      data: null,
    });
  }
);

const myAllRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const decodedToken = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    );

    const rides = await rideServer.myAllRides(decodedToken as JwtPayload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "All rides get successfully",
      data: rides,
    });
  }
);

export const rideController = {
  requestRide,
  cancelRide,
  myAllRides,
};
