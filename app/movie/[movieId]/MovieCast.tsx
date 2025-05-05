import Image from "next/image";
import React from "react";
import { movie_cast } from "@assets/links";

const MovieCast = ({ cast }: { cast: any }) => {
  const splitCharacter = cast.character.split("/");
  return (
    <div
      className="flex md:flex-col min-w-max shadow-[0px_10px_10px_rgb(0,0,0,0.5)]
      cast-card rounded-xl"
    >
      <Image
        className={`w-[20vw] h-auto rounded-tl-xl rounded-bl-xl
        ${
          cast.profile_path
            ? "md:w-[-webkit-fill-available] md:h-auto"
            : "md:w-min md:h-[175px]"
        } 
        md:rounded-t-xl md:rounded-bl-none`}
        src={`${movie_cast}${cast.profile_path}`}
        alt={cast.name}
        width={138}
        height={175}
        priority={true}
      />
      <div
        className="flex flex-col p-2 w-[138px] h-auto text-center bg-slate-200 
          rounded-tr-xl rounded-br-xl justify-center md:justify-start
          md:h-[140px] *:text-xs *:md:text-base md:rounded-b-xl"
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
