import axios from "axios";
import * as catsService from "../services/cats.service";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

describe("Cats Service", () => {
  it("getAllBreeds devuelve array", async () => {
    axiosMock.get.mockResolvedValue({ data: [{ id: "abys" }] });

    const data = await catsService.getAllBreeds();
    expect(data).toEqual([{ id: "abys" }]);
  });

  it("getBreedById pasa el ID", async () => {
    axiosMock.get.mockResolvedValue({ data: { id: "abys" } });

    const breed = await catsService.getBreedById("abys");
    expect(axiosMock.get).toHaveBeenCalledWith(
      expect.stringContaining("/breeds/abys"),
      expect.any(Object)
    );
    expect(breed.id).toBe("abys");
  });

  it("searchBreeds incluye query", async () => {
    axiosMock.get.mockResolvedValue({ data: [{ id: "sibe" }] });
    await catsService.searchBreeds("siberian");
    expect(axiosMock.get).toHaveBeenCalledWith(
      expect.stringContaining("search?q=siberian"),
      expect.any(Object)
    );
  });
});
