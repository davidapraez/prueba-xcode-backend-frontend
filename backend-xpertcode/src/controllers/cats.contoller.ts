import { Request, Response } from "express";
import * as catService from "../services/cats.service";

export const getAllBreeds = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 0;
  try {
    const breeds = await catService.getAllBreeds(page, limit);
    res.json(breeds);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo razas", err });
  }
};

export const getBreedById = async (req: Request, res: Response) => {
  try {
    const breed = await catService.getBreedById(req.params.breed_id);
    res.json(breed);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo la raza", err });
  }
};

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
