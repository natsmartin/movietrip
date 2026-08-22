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
          className={`flex-col items-center overflow-y-hidden overflow-x-hidden ${
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
