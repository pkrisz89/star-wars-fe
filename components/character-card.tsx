import { PropsWithChildren } from "react";
import cn from "classnames";

interface CharacterCardProps {
  additionalClassNames?: string;
}

export const CharacterCard = ({
  children,
  additionalClassNames,
}: PropsWithChildren<CharacterCardProps>) => {
  const classNames =
    "p-3 border border-solid rounded shadow-sm border-zinc-300 bg-stone-50";

  return (
    <div
      data-testid="character-card"
      className={cn(classNames, additionalClassNames)}
    >
      {children}
    </div>
  );
};
