import React from "react";
import MovieBox from "@sections/MovieBox/MovieBox";
import { Movie } from "@sections/MovieBox/MovieBox";

type MovieListType = Movie[];

const MovieList = ({ movieList }: { movieList: MovieListType | any }) => {
  return (
    <div className="flex flex-col items-center">
      {movieList?.map((movie: Movie, index: number) => (
        <MovieBox key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
