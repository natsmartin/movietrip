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
          className={`flex flex-col items-center px-4 overflow-y-hidden overflow-x-hidden w-fit ${
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
