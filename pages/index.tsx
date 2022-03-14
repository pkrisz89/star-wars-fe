import type { NextPage } from "next";
import Link from "next/link";
import { CharacterCard } from "../components/character-card";
import { ErrorState } from "../components/error";
import { Loader } from "../components/loader";
import { useGetPeople } from "../hooks/useGetPeople";
import { IPlanet } from "../types/sw-api-types";
import { getPath } from "../utils/getPath";

const Home: NextPage = () => {
  const qs = "?page=1";
  const { people, loading, error } = useGetPeople(qs);

  if (loading) return <Loader />;

  if (error) return <ErrorState />;

  return (
    <div className="container grid max-w-5xl grid-cols-1 gap-4 p-8 mx-auto my-0 md:grid-cols-2 lg:grid-cols-3">
      {people.map(({ name, gender, homeworld, url }) => (
        <CharacterCard
          key={name}
          additionalClassNames="hover:shadow-2xl hover:cursor-pointer"
        >
          <Link key={name} href={getPath(url)} passHref>
            <div data-testid="card-details">
              <h2
                data-testid="name"
                className="mb-4 text-lg font-bold underline"
              >
                {name}
              </h2>
              <p data-testid="gender">Gender: {gender}</p>
              <p data-testid="planet">Planet: {(homeworld as IPlanet).name}</p>
            </div>
          </Link>
        </CharacterCard>
      ))}
    </div>
  );
};

export default Home;
