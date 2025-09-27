import type { Request, Response } from "express";
interface AuthRequest extends Request {
    userEmail?: string;
}
export declare const createNote: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getNotes: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateNote: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteNote: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=noteController.d.ts.map