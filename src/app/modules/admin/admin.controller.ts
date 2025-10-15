/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";

const acceptDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.params.id;
    await adminService.acceptDriver(driverId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `New driver added successfully`,
      data: null,
    });
  }
);

const removeDriverRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.params.id;
    await adminService.removeDriverRole(driverId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Driver role removed successfully`,
      data: null,
    });
  }
);

const suspendDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const driverId = req.params.id;
    await adminService.suspendDriver(driverId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Driver suspend successfully`,
      data: null,
    });
  }
);

const blockUnblockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const activeStatus = req.body.isActive;
    await adminService.blockUnblockUser(userId as string, activeStatus);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `User activity updated successfully`,
      data: null,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const { data, meta } = await adminService.getAllUsers(
      query as Record<string, string>
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `All rides get successfully`,
      meta: meta,
      data: data,
    });
  }
);

const getAllRides = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const { data, meta } = await adminService.getAllRides(
      query as Record<string, string>
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `All rides get successfully`,
      meta: meta,
      data: data,
    });
  }
);

const getAllDrivers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const drivers = await adminService.getAllDrivers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `All rides get successfully`,
      data: drivers,
    });
  }
);

export const adminController = {
  acceptDriver,
  removeDriverRole,
  getAllRides,
  getAllUsers,
  suspendDriver,
  blockUnblockUser,
  getAllDrivers,
};
