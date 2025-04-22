import React from "react";
import MovieCast from "./MovieCast";

const MovieCredits = ({ movieCast }: { movieCast: any }) => {
  return (
    <>
      {movieCast ? (
        <div className="flex flex-col w-[100vw] my-4">
          <h2 className="w-full font-bold text-center text-base py-2 md:text-xl">
            Casts
          </h2>
          <div
            className={`flex overflow-x-scroll *:mx-1 *:my-3 ${
              movieCast.length < 11 ? "md:justify-center md:overflow-hidden" : ""
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
