import type { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    userEmail?: string;
}
export declare const authenticateJWT: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=middleware.d.ts.map