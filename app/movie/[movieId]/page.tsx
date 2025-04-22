"use client";

import React, { useState, useEffect, createContext, Suspense } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieTrailer,
} from "@utils/actions/fetch-data";
import Loading from "@app/loading";
import MovieDetails from "./MovieDetails";
import MovieCredits from "./MovieCredits";

interface MovieIdType {
  movieId: string;
}

export const MovieContext = createContext([]);

const MovieComponent = ({ params }: { params: MovieIdType }) => {
  const [movieDetails, setMovieDetails] = useState();
  const [movieCast, setMovieCast] = useState();
  const [movieCrew, setMovieCrew] = useState();
  const [movieTrailer, setMovieTrailer] = useState([]);


  useEffect(() => {
    const getMovie = async () => {
      const details = await fetchMovieDetails(params.movieId);
      setMovieDetails(details);
      const credits = await fetchMovieCredits(params.movieId);
      const filteredCasts = credits.cast.filter((cast: any) => cast.order < 16);
      setMovieCast(filteredCasts);
      const filteredCrews = credits.crew.filter(
        (crew: any) => crew.job === "Director"
      );
      setMovieCrew(filteredCrews);
      const trailer = await fetchMovieTrailer(params.movieId);
      setMovieTrailer(trailer);
      console.log(trailer);
    };

    if (!movieDetails || !movieCast || !movieCrew) {
      getMovie();
    }
  }, [movieCast, movieCrew, movieDetails, params.movieId]);

  return (
    <MovieContext.Provider value={movieTrailer}>
      <div className="md:h-[100vh] h-max p-4 flex flex-col justify-center items-center">
        <Suspense fallback={<Loading />}>
          <MovieDetails
            movieDetails={movieDetails}
            movieCrew={movieCrew}
          />
          <MovieCredits movieCast={movieCast} />
        </Suspense>
      </div>
    </MovieContext.Provider>
  );
};

export default MovieComponent;
