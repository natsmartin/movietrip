import Image from "next/image";
import React from "react";
import { movie_cast } from "@assets/links";

const MovieCast = ({ cast }: { cast: any }) => {
  const splitCharacter = cast.character.split("/");
  return (
    <div className="min-w-max shadow-xl rounded-xl">
      <Image
        className="rounded-t-xl"
        src={`${movie_cast}${cast.profile_path}`}
        alt={cast.name}
        width={138}
        height={175}
        priority={true}
      />
      <div
        className="cast-card flex flex-col p-2 w-[138px] h-[80px] text-center bg-slate-200 
          md:h-[140px] *:text-xs *:md:text-base rounded-b-xl"
      >
        <p className="font-bold text-xs text-center md:text-base">
          {cast.name}
        </p>

        {splitCharacter.map((character: string, index: number) => (
          <p className="italic" key={index}>
            {character} {index === splitCharacter.length - 1 ? "" : "/"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
