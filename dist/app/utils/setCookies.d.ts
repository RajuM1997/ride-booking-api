import { Response } from "express";
export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}
export declare const setAuthCookies: (res: Response, tokenInfo: AuthTokens) => void;
//# sourceMappingURL=setCookies.d.ts.map