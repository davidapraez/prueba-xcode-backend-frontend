import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
}

export const generateToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
