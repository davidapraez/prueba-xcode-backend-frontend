import { Request, Response } from "express";
import * as catService from "../services/cats.service";

/** GET /api/breeds */
export const getAllBreeds = async (_: Request, res: Response) => {
  try {
    const breeds = await catService.getAllBreeds();
    res.json(breeds);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo razas", err });
  }
};

/** GET /api/breeds/:breed_id */
export const getBreedById = async (req: Request, res: Response) => {
  try {
    const breed = await catService.getBreedById(req.params.breed_id);
    res.json(breed);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo la raza", err });
  }
};

/** GET /api/breeds/search?q=texto */
export const searchBreeds = async (req: Request, res: Response) => {
  const q = req.query.q as string;
  if (!q) return res.status(400).json({ message: "Parámetro q requerido" });

  try {
    const results = await catService.searchBreeds(q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error en la búsqueda", err });
  }
};

/** GET /api/images/bybreedid?breed_id=xyz&limit=5 */
export const getImagesByBreedId = async (req: Request, res: Response) => {
  const { breed_id, limit } = req.query;
  if (!breed_id) return res.status(400).json({ message: "breed_id requerido" });

  try {
    const images = await catService.getImagesByBreedId(
      breed_id as string,
      Number(limit) || 5
    );
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo imágenes", err });
  }
};
