import Image from "next/image";
import React from "react";

const MovieCast = ({ cast }: { cast: any }) => {
  const splitCharacter = cast.character.split("/");
  return (
    <div className="min-w-max shadow-xl rounded-xl">
      <Image
        className="rounded-t-xl"
        src={`https://media.themoviedb.org/t/p/w138_and_h175_bestv2${cast.profile_path}`}
        alt={cast.name}
        width={138}
        height={175}
        priority={true}
      />
      <div className="flex flex-col h-[100px] text-center bg-slate-200 *:text-xs *:md:text-base rounded-b-xl">
      <p className="font-bold text-xs text-center md:text-base">{cast.name}</p>
      
      {splitCharacter.map((character: string, index: number) => (
        <p className="italic" key={index}>{character} {index === splitCharacter.length-1 ? '' : '/'}</p>
      ))}
      </div>
    </div>
  );
};

export default MovieCast;
