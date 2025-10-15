export declare const adminService: {
    getAllUsers: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../user/user.interface").IUser, {}, {}> & import("../user/user.interface").IUser & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getAllRides: (query: Record<string, string>) => Promise<{
        data: (import("mongoose").Document<unknown, {}, {
            status: import("../ride/ride.interface").IRideStatus;
            currentStatus: import("mongoose").Types.DocumentArray<import("../ride/ride.interface").ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, import("../ride/ride.interface").ICurrentStatus> & import("../ride/ride.interface").ICurrentStatus>;
            driver?: import("mongoose").Types.ObjectId | null;
            rider?: import("mongoose").Types.ObjectId | null;
            pickup?: string | null;
            destination?: string | null;
            fare?: number | null;
            driverRideStatus?: import("../driver/driver.interface").DriverRideStatus | null;
        } & import("mongoose").DefaultTimestampProps, {}, {
            timestamps: true;
        }> & {
            status: import("../ride/ride.interface").IRideStatus;
            currentStatus: import("mongoose").Types.DocumentArray<import("../ride/ride.interface").ICurrentStatus, import("mongoose").Types.Subdocument<import("bson").ObjectId, any, import("../ride/ride.interface").ICurrentStatus> & import("../ride/ride.interface").ICurrentStatus>;
            driver?: import("mongoose").Types.ObjectId | null;
            rider?: import("mongoose").Types.ObjectId | null;
            pickup?: string | null;
            destination?: string | null;
            fare?: number | null;
            driverRideStatus?: import("../driver/driver.interface").DriverRideStatus | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
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
    getAllDrivers: () => Promise<(import("mongoose").Document<unknown, {}, import("../user/user.interface").IUser, {}, {}> & import("../user/user.interface").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    acceptDriver: (userId: string) => Promise<void>;
    removeDriverRole: (userId: string) => Promise<void>;
    suspendDriver: (userId: string) => Promise<void>;
    blockUnblockUser: (userId: string, activeStatus: string) => Promise<void>;
};
//# sourceMappingURL=admin.service.d.ts.map