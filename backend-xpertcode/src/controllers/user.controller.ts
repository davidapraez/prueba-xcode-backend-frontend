import { Request, RequestHandler, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import * as userService from "../services/users.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await userService.register(name, email, password);
    res.status(201).json({ message: "Usuario registrado correctamente", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.login(email, password);
    res.json({
      message: "Inicio de sesión exitoso",
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err: any) {
    const code = err.message === "Contraseña incorrecta" ? 401 : 404;
    res.status(code).json({ message: err.message });
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  const { userId } = req as unknown as AuthenticatedRequest;

  if (!userId) {
    return res.status(401).json({ message: "Token no válido" });
  }

  try {
    const user = await userService.getById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error interno", err });
  }
};
