"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cats_contoller_1 = require("../controllers/cats.contoller");
const router = (0, express_1.Router)();
router.get("/", cats_contoller_1.getAllBreeds); // GET /api/breeds
router.get("/search", cats_contoller_1.searchBreeds); // GET /api/breeds/search?q=...
router.get("/:breed_id", cats_contoller_1.getBreedById); // GET /api/breeds/:id
router.get("/images/bybreedid", cats_contoller_1.getImagesByBreedId); // GET /api/breeds/images/bybreedid?breed_id=xyz&limit=5
exports.default = router;
