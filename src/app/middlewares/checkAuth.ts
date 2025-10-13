import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatusCode from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { IsActive, Role } from "../modules/user/user.interface";
import { verifyToken } from "../utils/jwt";
import {
  DriverStatus,
  IsAvailability,
} from "../modules/driver/driver.interface";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(httpStatusCode.FORBIDDEN, "No Token Received");
      }

      const verifiedRefreshToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({
        email: verifiedRefreshToken.email,
      });

      if (!accessToken) {
        throw new AppError(httpStatusCode.UNAUTHORIZED, "No token found");
      }

      if (!isUserExist) {
        throw new AppError(httpStatusCode.BAD_REQUEST, "User does not Found");
      }

      if (isUserExist.isActive === IsActive.BLOCKED) {
        throw new AppError(
          httpStatusCode.BAD_REQUEST,
          `User is ${isUserExist.isActive}`
        );
      }

      if (isUserExist.isDeleted) {
        throw new AppError(httpStatusCode.BAD_REQUEST, "User is deleted");
      }
      const verifiedToken = jwt.verify(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      if (!verifiedToken) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          "You are not authorized"
        );
      }

      if (isUserExist.role === Role.DRIVER) {
        if (!isUserExist.driver) {
          throw new AppError(
            httpStatusCode.FORBIDDEN,
            "Please complete Your Profile"
          );
        }
        if (isUserExist.driver.driverStatus === DriverStatus.SUSPEND) {
          throw new AppError(
            httpStatusCode.FORBIDDEN,
            "You are not verified driver"
          );
        }
        if (!isUserExist.driver.licenseNumber) {
          throw new AppError(
            httpStatusCode.FORBIDDEN,
            "Please complete Your Profile"
          );
        }
        if (!isUserExist.driver.vehicleType) {
          throw new AppError(
            httpStatusCode.FORBIDDEN,
            "Please complete Your Profile"
          );
        }
        if (!isUserExist.driver.vehicleNumber) {
          throw new AppError(
            httpStatusCode.FORBIDDEN,
            "Please complete Your Profile"
          );
        }
        if (isUserExist.driver.isAvailability !== IsAvailability.ONLINE) {
          throw new AppError(
            httpStatusCode.FORBIDDEN,
            "You are not online so you can not book a ride"
          );
        }
      }

      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatusCode.UNAUTHORIZED,
          "You are not permitted to view this route!!"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
