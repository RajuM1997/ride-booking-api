import { Schema } from "mongoose";
import { ICurrentStatus, IRideStatus } from "./ride.interface";
import { DriverRideStatus } from "../driver/driver.interface";
export declare const Ride: import("mongoose").Model<{
    status: IRideStatus;
    currentStatus: import("mongoose").Types.DocumentArray<ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, ICurrentStatus> & ICurrentStatus>;
    driver?: import("mongoose").Types.ObjectId | null;
    rider?: import("mongoose").Types.ObjectId | null;
    pickup?: string | null;
    destination?: string | null;
    fare?: number | null;
    driverRideStatus?: DriverRideStatus | null;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    status: IRideStatus;
    currentStatus: import("mongoose").Types.DocumentArray<ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, ICurrentStatus> & ICurrentStatus>;
    driver?: import("mongoose").Types.ObjectId | null;
    rider?: import("mongoose").Types.ObjectId | null;
    pickup?: string | null;
    destination?: string | null;
    fare?: number | null;
    driverRideStatus?: DriverRideStatus | null;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    status: IRideStatus;
    currentStatus: import("mongoose").Types.DocumentArray<ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, ICurrentStatus> & ICurrentStatus>;
    driver?: import("mongoose").Types.ObjectId | null;
    rider?: import("mongoose").Types.ObjectId | null;
    pickup?: string | null;
    destination?: string | null;
    fare?: number | null;
    driverRideStatus?: DriverRideStatus | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: IRideStatus;
    currentStatus: import("mongoose").Types.DocumentArray<ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, ICurrentStatus> & ICurrentStatus>;
    driver?: import("mongoose").Types.ObjectId | null;
    rider?: import("mongoose").Types.ObjectId | null;
    pickup?: string | null;
    destination?: string | null;
    fare?: number | null;
    driverRideStatus?: DriverRideStatus | null;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    status: IRideStatus;
    currentStatus: import("mongoose").Types.DocumentArray<ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, ICurrentStatus> & ICurrentStatus>;
    driver?: import("mongoose").Types.ObjectId | null;
    rider?: import("mongoose").Types.ObjectId | null;
    pickup?: string | null;
    destination?: string | null;
    fare?: number | null;
    driverRideStatus?: DriverRideStatus | null;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    status: IRideStatus;
    currentStatus: import("mongoose").Types.DocumentArray<ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, ICurrentStatus> & ICurrentStatus>;
    driver?: import("mongoose").Types.ObjectId | null;
    rider?: import("mongoose").Types.ObjectId | null;
    pickup?: string | null;
    destination?: string | null;
    fare?: number | null;
    driverRideStatus?: DriverRideStatus | null;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=ride.model.d.ts.map