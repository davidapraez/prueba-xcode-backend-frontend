import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

let UserMock: {
  findOne: jest.Mock;
  create: jest.Mock;
};

jest.mock("../../src/models/user.model", () => {
  UserMock = {
    findOne: jest.fn(),
    create: jest.fn(),
  };
  return { __esModule: true, default: UserMock };
});

import * as usersService from "../../src/services/users.service";

const hashed = "hashed123";
(bcrypt.hash as jest.Mock).mockResolvedValue(hashed);
(bcrypt.compare as jest.Mock).mockResolvedValue(true);
(jwt.sign as jest.Mock).mockReturnValue("token123");

describe("Users Service", () => {
  beforeEach(() => jest.clearAllMocks());

  it("registra nuevo usuario", async () => {
    UserMock.findOne.mockResolvedValue(null);
    UserMock.create.mockResolvedValue({
      _id: "1",
      name: "Ana",
      email: "ana@mail.com",
      password: hashed,
    });

    const user = await usersService.register("Ana", "ana@mail.com", "123456");

    expect(UserMock.create).toHaveBeenCalledWith({
      name: "Ana",
      email: "ana@mail.com",
      password: hashed,
    });
    expect(user.password).toBe(hashed);
  });

  it("lanza error si email ya existe", async () => {
    UserMock.findOne.mockResolvedValue({ email: "dup@mail.com" });

    await expect(
      usersService.register("Dup", "dup@mail.com", "123")
    ).rejects.toThrow("El usuario ya existe");
  });

  it("login exitoso devuelve token", async () => {
    UserMock.findOne.mockResolvedValue({
      _id: "1",
      name: "Ana",
      email: "ana@mail.com",
      password: hashed,
    });

    const { token } = await usersService.login("ana@mail.com", "123456");

    expect(bcrypt.compare).toHaveBeenCalled();
    expect(token).toBe("token123");
  });
});
