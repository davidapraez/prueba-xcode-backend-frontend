"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const mockQuery = { select: jest.fn().mockReturnThis(), exec: jest.fn() };
const model = () => ({
    findOne: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
});
exports.model = model;
exports.default = { connect: jest.fn(), model: exports.model, Schema: class {
    } };
