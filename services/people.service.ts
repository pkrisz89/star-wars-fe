import { IFilm, IPeople, SwapiResponse } from "../types/sw-api-types";

class PeopleService {
  private baseUrl = "https://swapi.dev/api/";

  private async get(url: string) {
    const promise = await fetch(url);

    return promise.json();
  }

  private async resolveFilms(people: IPeople): Promise<IFilm[]> {
    return Promise.all(
      people.films.map(async (film) => {
        if (typeof film !== "string") {
          return film;
        }

        return await this.get(film);
      })
    );
  }

  async getPeople(params: string): Promise<SwapiResponse<IPeople> | IPeople> {
    const url = `${this.baseUrl}people/${params}`;

    return this.get(url);
  }

  async getWithHomeWorld(people: IPeople[]): Promise<IPeople[]> {
    return Promise.all(
      people.map(async (person) => {
        if (typeof person.homeworld !== "string") {
          return person;
        }

        return {
          ...person,
          homeworld: await this.get(person.homeworld),
        };
      })
    );
  }

  async getWithFilms(person: IPeople): Promise<IPeople> {
    return {
      ...person,
      films: await this.resolveFilms(person),
    };
  }
}

export const peopleService = new PeopleService();
