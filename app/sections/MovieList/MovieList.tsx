import React from "react";
import MovieBox from "@sections/MovieBox/MovieBox";
import { Movie } from "@sections/MovieBox/MovieBox";

type MovieListType = Movie[];

const MovieList = ({
  movieList,
  label,
}: {
  movieList: MovieListType | any;
  label: string | null;
}) => {
  return (
    <div className="flex flex-col items-center">

      <h1 className="title flex items-start w-[90vw] font-bold md:w-[65vw]">{label}</h1>

      {movieList?.map((movie: Movie, index: number) => (
        <MovieBox key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
