import { IRide, IRideStatus } from "./ride.interface";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
export declare const rideServer: {
    requestRide: (payload: IRide, decodedToken: JwtPayload) => Promise<mongoose.Document<unknown, {}, {
        status: IRideStatus;
        currentStatus: Types.DocumentArray<import("./ride.interface").ICurrentStatus, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, import("./ride.interface").ICurrentStatus> & import("./ride.interface").ICurrentStatus>;
        driver?: Types.ObjectId | null;
        rider?: Types.ObjectId | null;
        pickup?: string | null;
        destination?: string | null;
        fare?: number | null;
        driverRideStatus?: import("../driver/driver.interface").DriverRideStatus | null;
    } & mongoose.DefaultTimestampProps, {}, {
        timestamps: true;
    }> & {
        status: IRideStatus;
        currentStatus: Types.DocumentArray<import("./ride.interface").ICurrentStatus, Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, import("./ride.interface").ICurrentStatus> & import("./ride.interface").ICurrentStatus>;
        driver?: Types.ObjectId | null;
        rider?: Types.ObjectId | null;
        pickup?: string | null;
        destination?: string | null;
        fare?: number | null;
        driverRideStatus?: import("../driver/driver.interface").DriverRideStatus | null;
    } & mongoose.DefaultTimestampProps & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    cancelRide: (rideId: string, decodedToken: JwtPayload) => Promise<void>;
    myAllRides: (decodedToken: JwtPayload) => Promise<any[]>;
};
//# sourceMappingURL=ride.service.d.ts.map