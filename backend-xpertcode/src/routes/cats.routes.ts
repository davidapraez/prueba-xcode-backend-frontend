import { Router } from "express";
import {
  getAllBreeds,
  getBreedById,
  searchBreeds,
  getImagesByBreedId,
} from "../controllers/cats.contoller";

const router = Router();

router.get("/", getAllBreeds); // GET /api/breeds
router.get("/search", searchBreeds); // GET /api/breeds/search?q=...
router.get("/:breed_id", getBreedById); // GET /api/breeds/:id
router.get("/images/bybreedid", getImagesByBreedId); // GET /api/breeds/images/bybreedid?breed_id=xyz&limit=5

export default router;
