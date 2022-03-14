import { compose } from "msw";
import { useEffect, useState } from "react";
import { peopleService } from "../services/people.service";
import { IPeople } from "../types/sw-api-types";

interface UseGetPersonHook {
  person: IPeople | undefined;
  loading: boolean;
  error: boolean;
}

export const useGetPerson = (query: string): UseGetPersonHook => {
  const [person, setPerson] = useState<IPeople | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchPerson = async () => {
      try {
        setError(false);
        setLoading(true);

        const person = await peopleService.getPeople(query);

        const [personWithHomeworld] = await peopleService.getWithHomeWorld([
          person as IPeople,
        ]);

        const personWithFilms = await peopleService.getWithFilms(
          personWithHomeworld
        );

        setPerson(personWithFilms);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [query]);

  return { person, loading, error };
};
