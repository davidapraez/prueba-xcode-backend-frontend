"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!(auth === null || auth === void 0 ? void 0 : auth.startsWith("Bearer "))) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }
    try {
        const { userId } = (0, jwt_1.verifyToken)(auth.split(" ")[1]);
        req.userId = userId;
        next();
    }
    catch (_a) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};
exports.authMiddleware = authMiddleware;
