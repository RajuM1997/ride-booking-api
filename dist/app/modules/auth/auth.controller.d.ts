import { NextFunction, Request, Response } from "express";
export declare const authController: {
    credentialsLogin: (req: Request, res: Response, next: NextFunction) => void;
    getNewAccessToken: (req: Request, res: Response, next: NextFunction) => void;
    logout: (req: Request, res: Response, next: NextFunction) => void;
    resetPassword: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=auth.controller.d.ts.map