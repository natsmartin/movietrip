import Image from "next/image";
import React from "react";
import { movie_cast } from "@assets/links";
import Link from "next/link";

const MovieCast = ({ cast }: { cast: any }) => {
  const splitCharacter = cast.character.split("/");
  return (
    <Link href={`/person/${cast.id}`}>
      <div
        className="flex md:flex-col min-w-max shadow-[0px_10px_10px_rgb(0,0,0,0.5)] bg-slate-200
      cast-card rounded-xl"
      >
        <Image
          className={`rounded-tl-xl rounded-bl-xl text-[0.60rem] md:text-base
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
          className="card-role normal-text flex flex-col p-2 w-[138px] h-auto text-center 
          rounded-tr-xl rounded-br-xl justify-center md:justify-start
          md:rounded-b-xl md:rounded-tr-none"
        >
          <p className="font-bold text-center">
            {cast.name}
          </p>

          {splitCharacter.map((character: string, index: number) => (
            <p className="italic" key={index}>
              {character} {index === splitCharacter.length - 1 ? "" : "/"}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default MovieCast;
