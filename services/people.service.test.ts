import { IFilm, IPeople, SwapiResponse } from "../types/sw-api-types";
import { peopleService } from "./people.service";
import { mockPeople } from "../test-utils/mock-people-response";
import { mockPlanetResponse } from "../test-utils/mock-planet-response";

describe("People Service", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get people", () => {
    it("should call the correct url", async () => {
      await peopleService.getPeople("?page=1");

      expect(global.fetch).toHaveBeenCalledWith(
        "https://swapi.dev/api/people/?page=1"
      );
    });

    it("should return the api response", async () => {
      const res = await peopleService.getPeople("?page=1");

      expect(res as SwapiResponse<IPeople>).toEqual(mockPeople);
    });
  });

  describe("getWithHomeWorld", () => {
    it("should call the correct urls", async () => {
      await peopleService.getWithHomeWorld(
        mockPeople.results as unknown as IPeople[]
      );

      expect(global.fetch).toHaveBeenLastCalledWith(
        "https://swapi.dev/api/planets/1/"
      );
    });

    it("should decorate the input with homeworld objects", async () => {
      const res = await peopleService.getWithHomeWorld(
        mockPeople.results as unknown as IPeople[]
      );

      expect(res[0].name).toEqual("Luke Skywalker");
      expect(res[0].homeworld).toEqual(mockPlanetResponse);

      expect(res[1].name).toEqual("C-3PO");
      expect(res[1].homeworld).toEqual(mockPlanetResponse);
    });
  });

  describe("getWithFilms", () => {
    it("should call the correct urls", async () => {
      await peopleService.getWithFilms(
        mockPeople.results[0] as unknown as IPeople
      );

      expect(global.fetch).toHaveBeenLastCalledWith(
        "https://swapi.dev/api/films/6/"
      );
    });

    it("should decorate the input with film objects", async () => {
      const res = await peopleService.getWithFilms(
        mockPeople.results[0] as unknown as IPeople
      );

      expect((res.films[0] as IFilm).title).toEqual("Revenge of the Sith");
    });
  });
});
