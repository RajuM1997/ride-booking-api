import { NextFunction, Request, Response } from "express";
export declare const adminController: {
    acceptDriver: (req: Request, res: Response, next: NextFunction) => void;
    removeDriverRole: (req: Request, res: Response, next: NextFunction) => void;
    getAllRides: (req: Request, res: Response, next: NextFunction) => void;
    getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
    suspendDriver: (req: Request, res: Response, next: NextFunction) => void;
    blockUnblockUser: (req: Request, res: Response, next: NextFunction) => void;
    getAllDrivers: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=admin.controller.d.ts.map