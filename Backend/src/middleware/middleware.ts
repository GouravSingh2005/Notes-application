import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userEmail?: string;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.userEmail = payload.email; // ye sabhi controllers me accessible hoga
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
