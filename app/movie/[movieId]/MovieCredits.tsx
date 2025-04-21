import React from "react";
import MovieCast from "./MovieCast";

const MovieCredits = ({ movieCast }: { movieCast: any }) => {
  return (
    <>
      {movieCast ? (
        <div className="flex flex-col w-[100vw] my-4">
          <h2 className="w-full font-bold text-center text-base md:text-xl">
            Casts
          </h2>
          <div className="flex overflow-x-scroll *:mx-1 *:my-3">
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
