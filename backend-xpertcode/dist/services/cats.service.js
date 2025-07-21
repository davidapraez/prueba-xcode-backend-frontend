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
exports.getImagesByBreedId = exports.searchBreeds = exports.getBreedById = exports.getAllBreeds = void 0;
const axios_1 = __importDefault(require("axios"));
const CAT_API_BASE = "https://api.thecatapi.com/v1";
const HEADERS = { "x-api-key": process.env.CAT_API_KEY || "" };
/** Lista todas las razas */
const getAllBreeds = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${CAT_API_BASE}/breeds`, {
        headers: HEADERS,
    });
    return data; // array de razas
});
exports.getAllBreeds = getAllBreeds;
/** Obtiene una sola raza por ID */
const getBreedById = (breedId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${CAT_API_BASE}/breeds/${breedId}`, {
        headers: HEADERS,
    });
    return data; // objeto raza
});
exports.getBreedById = getBreedById;
/** Busca razas por texto (query q) */
const searchBreeds = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get(`${CAT_API_BASE}/breeds/search?q=${query}`, {
        headers: HEADERS,
    });
    return data; // array de coincidencias
});
exports.searchBreeds = searchBreeds;
/** Trae imágenes por raza */
const getImagesByBreedId = (breedId_1, ...args_1) => __awaiter(void 0, [breedId_1, ...args_1], void 0, function* (breedId, limit = 5) {
    const { data } = yield axios_1.default.get(`${CAT_API_BASE}/images/search?limit=${limit}&breed_ids=${breedId}`, { headers: HEADERS });
    return data; // array de imágenes
});
exports.getImagesByBreedId = getImagesByBreedId;
