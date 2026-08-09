import React, { use, Suspense } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieTrailer,
  MyObject,
} from "@utils/actions/fetch-data";

import Loading from "@app/loading";
import MovieCredits from "./MovieCredits";
import MovieDetails from "./MovieDetails";

interface MovieIdType {
  movieId: string;
}

const MovieComponent = ({ params }: { params: MovieIdType }) => {
  const movieDetails = use(fetchMovieDetails(params.movieId));
  const credits = use(fetchMovieCredits(params.movieId)) ?? { cast: [], crew: [] };
  const movieCast: never[] | MyObject[] = credits.cast ?? [];
  const movieCrew: never[] | MyObject[] = (credits.crew ?? []).filter(
    (crew: any) => crew.job === "Director"
  );
  const movieTrailer = use(fetchMovieTrailer(params.movieId)) ?? [];

  return (
    <div className="h-full py-4 flex flex-col justify-start items-center overflow-x-hidden">
      <Suspense fallback={<Loading />}>
        <MovieDetails
          movieDetails={movieDetails}
          movieCrew={movieCrew}
          movieTrailer={movieTrailer}
        />
        <MovieCredits movieCast={movieCast} />
      </Suspense>
    </div>
  );
};

export default MovieComponent;
