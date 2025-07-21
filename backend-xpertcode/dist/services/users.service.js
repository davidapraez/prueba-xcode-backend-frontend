"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../utils/jwt");
const register = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_model_1.default.findOne({ email });
    if (exists)
        throw new Error("El usuario ya existe");
    const hash = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_model_1.default.create({ name, email, password: hash });
    return user;
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield user_model_1.default.findOne({ email }));
    if (!user)
        throw new Error("Usuario no encontrado");
    const match = yield bcryptjs_1.default.compare(password, user.password);
    if (!match)
        throw new Error("Contraseña incorrecta");
    const token = (0, jwt_1.generateToken)(user.id);
    return { user, token };
});
exports.login = login;
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.findById(id).select("-password");
});
exports.getById = getById;
