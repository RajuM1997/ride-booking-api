import { Types } from "mongoose";
import { IDriver } from "../driver/driver.interface";

export enum Role {
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}

export enum IPaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  WALLET = "WALLET",
}

export interface IRider {
  paymentMethod: IPaymentMethod;
  rideHistory: Types.ObjectId[];
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVerified?: string;
  role: Role;
  driver?: IDriver;
  rider?: IRider;
}
