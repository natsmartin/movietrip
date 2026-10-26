import React from "react";
import MovieBox from "@sections/MovieBox/MovieBox";
import { Movie } from "@sections/MovieBox/MovieBox";

type MovieListType = Movie[];

const MovieList = ({
  movieList,
  isLoading,
}: {
  movieList: MovieListType | any;
  isLoading: boolean;
}) => {

  if (isLoading) {
    return;
  }

  return (
    <>
      {movieList.length && !isLoading ? (
        <div
          className={`flex w-full max-w-[1100px] min-w-0 flex-col items-center gap-3 overflow-y-hidden overflow-x-hidden px-3 sm:px-4 ${
            movieList?.length ? "flex" : "hidden"
          }`}
        >
          {movieList?.map((movie: Movie, index: number) => (
            <MovieBox key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <p id="no-results">No results found.</p>
      )}
    </>
  );
};

export default MovieList;
