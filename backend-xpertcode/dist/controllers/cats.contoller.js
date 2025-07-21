"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagesByBreedId = exports.searchBreeds = exports.getBreedById = exports.getAllBreeds = void 0;
const catService = __importStar(require("../services/cats.service"));
/** GET /api/breeds */
const getAllBreeds = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const breeds = yield catService.getAllBreeds();
        res.json(breeds);
    }
    catch (err) {
        res.status(500).json({ message: "Error obteniendo razas", err });
    }
});
exports.getAllBreeds = getAllBreeds;
/** GET /api/breeds/:breed_id */
const getBreedById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const breed = yield catService.getBreedById(req.params.breed_id);
        res.json(breed);
    }
    catch (err) {
        res.status(500).json({ message: "Error obteniendo la raza", err });
    }
});
exports.getBreedById = getBreedById;
/** GET /api/breeds/search?q=texto */
const searchBreeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const q = req.query.q;
    if (!q)
        return res.status(400).json({ message: "Parámetro q requerido" });
    try {
        const results = yield catService.searchBreeds(q);
        res.json(results);
    }
    catch (err) {
        res.status(500).json({ message: "Error en la búsqueda", err });
    }
});
exports.searchBreeds = searchBreeds;
/** GET /api/images/bybreedid?breed_id=xyz&limit=5 */
const getImagesByBreedId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { breed_id, limit } = req.query;
    if (!breed_id)
        return res.status(400).json({ message: "breed_id requerido" });
    try {
        const images = yield catService.getImagesByBreedId(breed_id, Number(limit) || 5);
        res.json(images);
    }
    catch (err) {
        res.status(500).json({ message: "Error obteniendo imágenes", err });
    }
});
exports.getImagesByBreedId = getImagesByBreedId;
