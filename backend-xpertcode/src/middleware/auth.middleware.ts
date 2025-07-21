import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest {
  userId: string;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const { userId } = verifyToken(auth.split(" ")[1]);
    (req as unknown as AuthenticatedRequest).userId = userId;
    next();
  } catch {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
