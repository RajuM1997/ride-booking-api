import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";
export declare const userService: {
    createUserService: (payload: Partial<IUser>) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateUser: (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getMe: (decodedToken: JwtPayload) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map