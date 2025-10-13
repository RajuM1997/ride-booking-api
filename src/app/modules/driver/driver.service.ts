import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { Ride } from "../ride/ride.model";
import { IRide, IRideStatus } from "../ride/ride.interface";
import { User } from "../user/user.model";
import mongoose from "mongoose";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { DriverInfo, DriverRideStatus } from "./driver.interface";

const approveDriver = async (rideId: string, decodedToken: JwtPayload) => {
  const existingUser = await User.findById(decodedToken.userId);

  if (!existingUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (existingUser.role !== "DRIVER") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not able to view this route"
    );
  }
  if (!existingUser.driver) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please complete your profile");
  }

  const ride = await Ride.findById(rideId);
  if (ride?.status !== IRideStatus.REQUESTED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This ride already booked please try another one"
    );
  }
  const updateRide = await Ride.findByIdAndUpdate(rideId, {
    status: IRideStatus.ACCEPTED,
    driver: decodedToken.userId,
    driverRideStatus: DriverRideStatus.ACCEPT,
  });
  const newDriverData = existingUser.driver;
  newDriverData.rideCapability = false;
  await User.findByIdAndUpdate(decodedToken.userId, {
    driver: newDriverData,
  });

  return updateRide;
};

const updateRideStatus = async (
  rideId: string,
  decodedToken: JwtPayload,
  payload: Partial<IRide>
) => {
  const ride = await Ride.findById(rideId);

  if (!ride) {
    throw new AppError(httpStatus.NOT_FOUND, "Ride not found");
  }

  const userId = new mongoose.Types.ObjectId(decodedToken.userId);

  if (!ride?.driver?.equals(userId)) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Yor are not able to updated status"
    );
  }

  if (ride.status === IRideStatus.COMPLETE) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can not change status because this ride already complete"
    );
  }

  if (payload.status === IRideStatus.COMPLETE) {
    await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(decodedToken.userId),
      {
        $inc: {
          "driver.completedRides": 1,
          "driver.totalEarning": ride.fare,
        },
        $set: {
          "driver.rideCapability": true,
        },
      },
      { new: true, runValidators: true }
    );
  }

  await Ride.findByIdAndUpdate(
    rideId,
    {
      status: payload.status,
      currentStatus: [
        {
          status: payload.status,
        },
      ],
    },
    { new: true, runValidators: true }
  );
};

const cancelRideDriver = async (rideId: string, decodedToken: JwtPayload) => {
  if (!decodedToken.userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const ride = await Ride.findById(rideId);
  const userId = new mongoose.Types.ObjectId(decodedToken.userId);

  if (!ride?.rider?.equals(userId)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "You are not abel to cancel this rides"
    );
  }
  await Ride.findByIdAndUpdate(rideId, {
    driverRideStatus: DriverRideStatus.REJECT,
  });
};

const updateDriverAvailability = async (
  decodedToken: JwtPayload,
  availabilityStatus: string
) => {
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  await User.findByIdAndUpdate(
    decodedToken.userId,
    {
      "driver.isAvailability": availabilityStatus,
    },
    { new: true, runValidators: true }
  );
};

const getMyRides = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Ride.find(), query);
  const rides = queryBuilder.filter().sort().paginate();
  const [data, meta] = await Promise.all([
    rides.build(),
    queryBuilder.getMeta(),
  ]);
  return { data, meta };
};

const totalCompleteRideAndEarning = async (decodedToken: JwtPayload) => {
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const driverInfo: DriverInfo = {};
  driverInfo.totalCompleteRides = user.driver?.completedRides as number;
  driverInfo.totalAmount = user.driver?.totalEarning as number;
  return {
    driverInfo,
  };
};

export const driverService = {
  approveDriver,
  updateRideStatus,
  getMyRides,
  totalCompleteRideAndEarning,
  updateDriverAvailability,
  cancelRideDriver,
};
