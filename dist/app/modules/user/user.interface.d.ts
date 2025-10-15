import { Types } from "mongoose";
import { IDriver } from "../driver/driver.interface";
export declare enum Role {
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER"
}
export declare enum IPaymentMethod {
    CASH = "CASH",
    CARD = "CARD",
    WALLET = "WALLET"
}
export interface IRider {
    paymentMethod: IPaymentMethod;
    rideHistory: Types.ObjectId[];
}
export declare enum IsActive {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
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
//# sourceMappingURL=user.interface.d.ts.map