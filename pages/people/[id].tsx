import type { NextPage } from "next";
import { useRouter } from "next/router";
import { CharacterCard } from "../../components/character-card";
import { ErrorState } from "../../components/error";
import { Loader } from "../../components/loader";
import { useGetPerson } from "../../hooks/useGetPerson";
import { IFilm, IPlanet } from "../../types/sw-api-types";

const ListPage: NextPage = () => {
  const router = useRouter();

  const { person, loading, error } = useGetPerson(router.query.id as string);

  if (loading) return <Loader />;

  if (error) return <ErrorState />;

  return (
    <div className="max-w-xl p-8 mx-auto my-0">
      <CharacterCard>
        <div>
          <h2 data-testid="name" className="mb-4 text-lg font-bold underline">
            {person?.name}
          </h2>
          <p data-testid="hair-color" className="mb-2">
            Hair: {person?.hair_color}
          </p>
          <p data-testid="eye-color" className="mb-2">
            Eyes: {person?.eye_color}
          </p>
          <p data-testid="gender" className="mb-2">
            Gender: {person?.gender}
          </p>
          <p data-testid="planet" className="mb-2">
            Planet: {(person?.homeworld as IPlanet).name}
          </p>
          <p>Films:</p>
          <ul data-testid="films">
            {(person?.films as IFilm[]).map((film, idx) => (
              <li className="pl-2" key={film.title + idx}>
                - {film.title}
              </li>
            ))}
          </ul>
        </div>
      </CharacterCard>
    </div>
  );
};

export default ListPage;
