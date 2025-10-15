export declare enum DriverStatus {
    APPROVE = "APPROVE",
    SUSPEND = "SUSPEND"
}
export declare enum IsAvailability {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
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
export declare enum DriverRideStatus {
    ACCEPT = "ACCEPT",
    REJECT = "REJECT"
}
export interface DriverInfo {
    totalCompleteRides?: number;
    totalAmount?: number;
}
//# sourceMappingURL=driver.interface.d.ts.map