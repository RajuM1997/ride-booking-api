import { Types } from "mongoose";

export enum IRideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETE = "COMPLETE",
  CANCELLED = "CANCELLED",
}

export interface ICurrentStatus {
  status: string;
  currentTimeTamp: Date;
}
export interface IRide {
  rider?: Types.ObjectId;
  driver?: Types.ObjectId;
  pickup: string;
  destination: string;
  status: IRideStatus;
  fare: number;
  currentStatus: ICurrentStatus;
  driverRideStatus: string;
}
