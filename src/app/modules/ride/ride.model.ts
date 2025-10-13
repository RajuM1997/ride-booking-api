import { model, Schema } from "mongoose";
import { ICurrentStatus, IRideStatus } from "./ride.interface";
import { DriverRideStatus } from "../driver/driver.interface";

const currentStatusSchema = new Schema<ICurrentStatus>(
  {
    status: {
      type: String,
      required: true,
    },
    currentTimeTamp: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const rideSchema = new Schema(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pickup: {
      type: String,
    },
    destination: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(IRideStatus),
      default: IRideStatus.REQUESTED,
    },
    fare: {
      type: Number,
    },
    driverRideStatus: {
      type: String,
      enum: DriverRideStatus,
    },
    currentStatus: [currentStatusSchema],
  },
  { timestamps: true }
);

export const Ride = model("ride", rideSchema);
