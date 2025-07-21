import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user.model";
import { generateToken } from "../utils/jwt";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("El usuario ya existe");

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  return user;
};

export const login = async (email: string, password: string) => {
  const user = (await User.findOne({ email })) as IUser | null;
  if (!user) throw new Error("Usuario no encontrado");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Contraseña incorrecta");

  const token = generateToken(user.id);
  return { user, token };
};

export const getById = async (id: string) => {
  return User.findById(id).select("-password");
};
