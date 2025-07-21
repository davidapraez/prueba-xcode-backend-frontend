import { Router } from "express";
import {
  getAllBreeds,
  getBreedById,
  searchBreeds,
  getImagesByBreedId,
} from "../controllers/cats.contoller";

const router = Router();
router.get("/", getAllBreeds);
router.get("/search", searchBreeds);
router.get("/images/bybreedid", getImagesByBreedId);
router.get("/:breed_id", getBreedById);

export default router;
