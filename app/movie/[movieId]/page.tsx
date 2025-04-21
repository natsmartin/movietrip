"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
} from "@utils/actions/fetch-data";
import Loading from "@app/loading";
import MovieDetails from "./MovieDetails";
import MovieCredits from "./MovieCredits";

interface MovieIdType {
  movieId: string;
}

const MovieComponent = ({ params }: { params: MovieIdType }) => {
  const [movieDetails, setMovieDetails] = useState();
  const [movieCast, setMovieCast] = useState();
  const [movieCrew, setMovieCrew] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const details = await fetchMovieDetails(params.movieId);
      setMovieDetails(details);
      const credits = await fetchMovieCredits(params.movieId);
      const filteredCasts = credits.cast.filter((cast: any) => cast.order < 16);
      setMovieCast(filteredCasts);
      const filteredCrews = credits.crew.filter((crew: any) => crew.job === 'Director');
      setMovieCrew(filteredCrews);
    };

    if (!movieDetails || !movieCast || !movieCrew) {
      getMovie();
    }
  }, [movieCast, movieCrew, movieDetails, params.movieId]);

  return (
    <div className="md:h-[100vh] h-max p-4 flex flex-col justify-center items-center">
      <Suspense fallback={<Loading />}>
        <MovieDetails movieDetails={movieDetails} movieCrew={movieCrew}/>
        <MovieCredits movieCast={movieCast} />
      </Suspense>
    </div>
  );
};

export default MovieComponent;
