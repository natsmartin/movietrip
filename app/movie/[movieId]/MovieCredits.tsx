import React from "react";
import MovieCast from "./MovieCast";

const MovieCredits = ({ movieCast }: { movieCast: any }) => {
  return (
    <>
      {movieCast.length ? (
        <div className="flex flex-col w-[100vw] px-8 my-4">
          <h2 className="w-full font-bold text-center text-base py-2 md:text-xl">
            Top Casts
          </h2>
          <div
            className={`flex flex-col w-max place-self-center h-[50vh] overflow-y-scroll md:overflow-y-hidden px-4 py-1 bg-white 
              md:overflow-x-scroll md:h-auto md:w-[1250px] md:flex-row *:mx-1 *:my-3
            `}
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
