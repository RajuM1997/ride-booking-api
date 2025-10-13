export enum DriverStatus {
  APPROVE = "APPROVE",
  SUSPEND = "SUSPEND",
}
export enum IsAvailability {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export interface IDriver {
  licenseNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  rating: number;
  completedRides: number;
  isAvailability: IsAvailability;
  driverStatus: DriverStatus;
  totalEarning: number;
  rideCapability: boolean;
}

export enum DriverRideStatus {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
}

export interface DriverInfo {
  totalCompleteRides?: number;
  totalAmount?: number;
}
