import React from "react";
import MovieBox from "@sections/MovieBox/MovieBox";
import { Movie } from "@sections/MovieBox/MovieBox";

type MovieListType = Movie[];

const MovieList = ({ movieList }: { movieList: MovieListType | any }) => {
  return (
    <div className="flex flex-col items-center">
      {movieList?.length !== 0 ? (
        movieList?.map((movie: Movie, index: number) => (
          <MovieBox key={index} movie={movie} />
        ))
      ) : (
        <p id="no-results">No results found.</p>
      )}
    </div>
  );
};

export default MovieList;
