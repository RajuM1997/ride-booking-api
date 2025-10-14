import { model, Schema } from "mongoose";
import {
  IPaymentMethod,
  IRider,
  IsActive,
  IUser,
  Role,
} from "./user.interface";
import {
  DriverStatus,
  IDriver,
  IsAvailability,
} from "../driver/driver.interface";

const driverSchema = new Schema<IDriver>(
  {
    licenseNumber: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    completedRides: {
      type: Number,
      required: true,
      default: 0,
    },
    rideCapability: {
      type: Boolean,
      default: true,
    },
    isAvailability: {
      type: String,
      enum: IsAvailability,
      default: IsAvailability.ONLINE,
    },
    driverStatus: {
      type: String,
      enum: DriverStatus,
    },
    totalEarning: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, _id: false }
);

const riderSchema = new Schema<IRider>(
  {
    paymentMethod: {
      type: String,
      enum: Object.values(IPaymentMethod),
      default: IPaymentMethod.CASH,
    },
    rideHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ride",
      },
    ],
  },
  { versionKey: false, _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.RIDER,
    },
    phone: {
      type: String,
    },
    picture: {
      type: String,
    },
    address: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    driver: {
      type: driverSchema,
    },
    rider: {
      type: riderSchema,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
