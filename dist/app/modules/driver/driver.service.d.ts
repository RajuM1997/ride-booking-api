import { JwtPayload } from "jsonwebtoken";
import { IRide, IRideStatus } from "../ride/ride.interface";
import mongoose from "mongoose";
import { DriverInfo, DriverRideStatus } from "./driver.interface";
export declare const driverService: {
    approveDriver: (rideId: string, decodedToken: JwtPayload) => Promise<(mongoose.Document<unknown, {}, {
        status: IRideStatus;
        currentStatus: mongoose.Types.DocumentArray<import("../ride/ride.interface").ICurrentStatus, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, import("../ride/ride.interface").ICurrentStatus> & import("../ride/ride.interface").ICurrentStatus>;
        driver?: mongoose.Types.ObjectId | null;
        rider?: mongoose.Types.ObjectId | null;
        pickup?: string | null;
        destination?: string | null;
        fare?: number | null;
        driverRideStatus?: DriverRideStatus | null;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
    }> & {
        status: IRideStatus;
        currentStatus: mongoose.Types.DocumentArray<import("../ride/ride.interface").ICurrentStatus, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, import("../ride/ride.interface").ICurrentStatus> & import("../ride/ride.interface").ICurrentStatus>;
        driver?: mongoose.Types.ObjectId | null;
        rider?: mongoose.Types.ObjectId | null;
        pickup?: string | null;
        destination?: string | null;
        fare?: number | null;
        driverRideStatus?: DriverRideStatus | null;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    updateRideStatus: (rideId: string, decodedToken: JwtPayload, payload: Partial<IRide>) => Promise<void>;
    getMyRides: (query: Record<string, string>) => Promise<{
        data: (mongoose.Document<unknown, {}, {
            status: IRideStatus;
            currentStatus: mongoose.Types.DocumentArray<import("../ride/ride.interface").ICurrentStatus, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, import("../ride/ride.interface").ICurrentStatus> & import("../ride/ride.interface").ICurrentStatus>;
            driver?: mongoose.Types.ObjectId | null;
            rider?: mongoose.Types.ObjectId | null;
            pickup?: string | null;
            destination?: string | null;
            fare?: number | null;
            driverRideStatus?: DriverRideStatus | null;
        } & mongoose.DefaultTimestampProps, {}, {
            timestamps: true;
        }> & {
            status: IRideStatus;
            currentStatus: mongoose.Types.DocumentArray<import("../ride/ride.interface").ICurrentStatus, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, import("../ride/ride.interface").ICurrentStatus> & import("../ride/ride.interface").ICurrentStatus>;
            driver?: mongoose.Types.ObjectId | null;
            rider?: mongoose.Types.ObjectId | null;
            pickup?: string | null;
            destination?: string | null;
            fare?: number | null;
            driverRideStatus?: DriverRideStatus | null;
        } & mongoose.DefaultTimestampProps & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    totalCompleteRideAndEarning: (decodedToken: JwtPayload) => Promise<{
        driverInfo: DriverInfo;
    }>;
    updateDriverAvailability: (decodedToken: JwtPayload, availabilityStatus: string) => Promise<void>;
    cancelRideDriver: (rideId: string, decodedToken: JwtPayload) => Promise<void>;
};
//# sourceMappingURL=driver.service.d.ts.map