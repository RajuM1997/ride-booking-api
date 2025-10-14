import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import { IsActive, Role } from "../user/user.interface";
import { Ride } from "../ride/ride.model";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userEmailSearchableFiends } from "./admin.constant";
import { DriverStatus } from "../driver/driver.interface";

const acceptDriver = async (userId: string) => {
  const existingDriver = await User.findById(userId);
  if (!existingDriver) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (existingDriver.role === Role.DRIVER) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already driver");
  }
  if (existingDriver.isActive === IsActive.BLOCKED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user blocked so you can not change status here"
    );
  }
  await User.findByIdAndUpdate(
    userId,
    { role: "DRIVER", "driver.driverStatus": DriverStatus.APPROVE },
    { new: true, runValidators: true }
  );
};

const removeDriverRole = async (userId: string) => {
  const existingDriver = await User.findById(userId);
  if (!existingDriver) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (existingDriver.role !== Role.DRIVER) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user not a driver");
  }
  if (existingDriver.isActive === IsActive.BLOCKED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user blocked so you can not change status"
    );
  }
  await User.findByIdAndUpdate(
    userId,
    { role: "RIDER" },
    { new: true, runValidators: true }
  );
};

const suspendDriver = async (userId: string) => {
  const existingDriver = await User.findById(userId);
  if (!existingDriver) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (existingDriver.role !== Role.DRIVER) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user not a driver");
  }
  if (existingDriver.isActive === IsActive.BLOCKED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user blocked so you can not change status"
    );
  }
  await User.findByIdAndUpdate(
    userId,
    { "driver.driverStatus": DriverStatus.SUSPEND },
    { new: true, runValidators: true }
  );
};

const blockUnblockUser = async (userId: string, activeStatus: string) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  await User.findByIdAndUpdate(
    userId,
    { isActive: activeStatus },
    { new: true, runValidators: true }
  );
};

const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);
  const users = queryBuilder
    .search(userEmailSearchableFiends)
    .filter()
    .sort()
    .paginate();
  const [data, meta] = await Promise.all([
    users.build(),
    queryBuilder.getMeta(),
  ]);
  return { data, meta };
};

const getAllRides = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Ride.find(), query);
  const rides = queryBuilder.filter().paginate();
  const [data, meta] = await Promise.all([
    rides.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getAllDrivers = async () => {
  const drivers = User.find({ role: "DRIVER" });

  return drivers;
};

export const adminService = {
  getAllUsers,
  getAllRides,
  getAllDrivers,
  acceptDriver,
  removeDriverRole,
  suspendDriver,
  blockUnblockUser,
};
