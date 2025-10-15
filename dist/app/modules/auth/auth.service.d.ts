import { IUser } from "../user/user.interface";
import { JwtPayload } from "jsonwebtoken";
export declare const authServices: {
    credentialsLogin: (payload: Partial<IUser>) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            _id: import("mongoose").Types.ObjectId;
            name: string;
            email: string;
            phone?: string;
            picture?: string;
            address?: string;
            isDeleted?: string;
            isActive?: import("../user/user.interface").IsActive;
            isVerified?: string;
            role: import("../user/user.interface").Role;
            driver?: import("../driver/driver.interface").IDriver;
            rider?: import("../user/user.interface").IRider;
            __v: number;
        };
    }>;
    getNewAccessToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
    resetPassword: (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map