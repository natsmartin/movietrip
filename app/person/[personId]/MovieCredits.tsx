import React from "react";
import Image from "next/image";
import { movie_cast } from "@app/assets/links";
import Link from "next/link";

const MovieCredits = ({ movies }: { movies: any }) => {
  return (
    <>
      {movies?.length ? (
        <div className="flex flex-col w-full px-4">
          <h2 className="font-bold text-xl text-center md:text-start py-3">Other Movies</h2>
          <div
            className={`flex flex-col w-max h-[50vh] overflow-y-scroll md:overflow-y-hidden px-0 py-0 
              md:overflow-x-scroll md:h-auto md:w-auto md:flex-row *:mx-1 *:my-3 bg-white
              ${
                movies.length < 11 ? "md:justify-start md:overflow-hidden" : ""
              }`}
          >
            {movies?.map((movie: any, index: number) => (
              <OtherMovies key={index} movie={movie} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MovieCredits;

const OtherMovies = ({ movie }: { movie: any }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="flex md:flex-col min-w-max">
        <Image
          className="rounded-md"
          src={`${movie_cast}${movie.poster_path}`}
          alt={movie.title}
          width={138}
          height={175}
          priority={true}
        />
        <p className="italic text-sm md:pt-3 md:text-base text-black text-center w-[138px] self-center">{movie.title}</p>
      </div>
    </Link>
  );
};
