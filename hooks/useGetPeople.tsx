import { useEffect, useState } from "react";
import { peopleService } from "../services/people.service";
import { IPeople, SwapiResponse } from "../types/sw-api-types";

interface UseGetPeopleHook {
  people: IPeople[];
  loading: boolean;
  error: boolean;
}

export const useGetPeople = (params: string): UseGetPeopleHook => {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params) return;

    const fetchPeople = async () => {
      try {
        setError(false);
        setLoading(true);

        const people = await peopleService.getPeople(params);

        const peopleWithHomeworld = await peopleService.getWithHomeWorld(
          (people as SwapiResponse<IPeople>).results
        );

        setPeople(peopleWithHomeworld);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [params]);

  return { people, loading, error };
};
