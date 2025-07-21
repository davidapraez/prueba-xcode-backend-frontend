import axios from "axios";

const CAT_API_BASE = "https://api.thecatapi.com/v1";
const HEADERS = { "x-api-key": process.env.CAT_API_KEY || "" };

export const getAllBreeds = async (page = 0, limit = 10) => {
  const { data } = await axios.get(`${CAT_API_BASE}/breeds`, {
    headers: HEADERS,
    params: { page, limit },
  });

  if (data.length > limit) {
    return data.slice(0, limit);
  }
  return data;
};

export const getBreedById = async (breedId: string) => {
  const { data } = await axios.get(`${CAT_API_BASE}/breeds/${breedId}`, {
    headers: HEADERS,
  });
  return data;
};

export const searchBreeds = async (query: string) => {
  const { data } = await axios.get(`${CAT_API_BASE}/breeds/search?q=${query}`, {
    headers: HEADERS,
  });
  return data;
};

export const getImagesByBreedId = async (breedId: string, limit = 5) => {
  const { data } = await axios.get(
    `${CAT_API_BASE}/images/search?limit=${limit}&breed_ids=${breedId}`,
    { headers: HEADERS }
  );
  return data;
};
