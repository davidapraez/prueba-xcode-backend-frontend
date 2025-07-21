import axios from "axios";

const CAT_API_BASE = "https://api.thecatapi.com/v1";
const HEADERS = { "x-api-key": process.env.CAT_API_KEY || "" };

/** Lista todas las razas */
export const getAllBreeds = async () => {
  const { data } = await axios.get(`${CAT_API_BASE}/breeds`, {
    headers: HEADERS,
  });
  return data; // array de razas
};

/** Obtiene una sola raza por ID */
export const getBreedById = async (breedId: string) => {
  const { data } = await axios.get(`${CAT_API_BASE}/breeds/${breedId}`, {
    headers: HEADERS,
  });
  return data; // objeto raza
};

/** Busca razas por texto (query q) */
export const searchBreeds = async (query: string) => {
  const { data } = await axios.get(`${CAT_API_BASE}/breeds/search?q=${query}`, {
    headers: HEADERS,
  });
  return data; // array de coincidencias
};

/** Trae imágenes por raza */
export const getImagesByBreedId = async (breedId: string, limit = 5) => {
  const { data } = await axios.get(
    `${CAT_API_BASE}/images/search?limit=${limit}&breed_ids=${breedId}`,
    { headers: HEADERS }
  );
  return data; // array de imágenes
};
