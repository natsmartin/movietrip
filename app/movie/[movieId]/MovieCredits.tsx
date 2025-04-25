import React from "react";
import MovieCast from "./MovieCast";

const MovieCredits = ({ movieCast }: { movieCast: any }) => {
  return (
    <>
      {movieCast.length ? (
        <div className="flex flex-col w-[100vw] px-2 md:px-14 my-4">
          <h2 className="w-full font-bold text-center text-base py-2 md:text-xl">
            Top Casts
          </h2>
          <div
            className={`flex flex-col w-min place-self-center h-[50vh] overflow-y-scroll md:overflow-y-hidden pb-4 
              md:overflow-x-scroll md:place-self-auto md:h-auto md:w-auto md:flex-row *:mx-1 *:my-3
              ${movieCast.length < 11 ? "md:justify-center md:overflow-hidden" : ""
            }`}
          >
            {movieCast.map((cast: any, index: number) => (
              <MovieCast key={index} cast={cast} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MovieCredits;
