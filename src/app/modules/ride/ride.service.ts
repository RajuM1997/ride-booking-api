import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IRide, IRideStatus } from "./ride.interface";
import { Ride } from "./ride.model";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

const requestRide = async (payload: IRide, decodedToken: JwtPayload) => {
  if (!decodedToken.userId) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  const ride = await Ride.create({ ...payload, rider: decodedToken.userId });
  return ride;
};

const cancelRide = async (rideId: string, decodedToken: JwtPayload) => {
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
  if (
    ride?.status === IRideStatus.ACCEPTED ||
    ride?.status === IRideStatus.PICKED_UP ||
    ride?.status === IRideStatus.IN_TRANSIT ||
    ride?.status === IRideStatus.COMPLETE
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "You can not cancel this ride");
  }
  await Ride.findByIdAndUpdate(rideId, {
    status: IRideStatus.CANCELLED,
  });
};

const myAllRides = async (decodedToken: JwtPayload) => {
  const rides = await Ride.find({ rider: decodedToken.userId });
  if (!rides) {
    throw new AppError(httpStatus.NOT_FOUND, "No ride found");
  }
  return rides;
};

export const rideServer = {
  requestRide,
  cancelRide,
  myAllRides,
};
