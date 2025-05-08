"use client";

import React, {
  useState,
  useEffect,
  createContext,
  Suspense,
  useContext,
} from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieTrailer,
  MyObject,
  getYear,
} from "@utils/actions/fetch-data";
import Image from "next/image";
import Loading from "@app/loading";
import MovieCredits from "./MovieCredits";
import * as link from "@assets/links";
import { formatDate } from "@app/sections/Details/Details";
import ModalVideo from "react-modal-video";
// import { Grow } from "@mui/material";

interface MovieIdType {
  movieId: string;
}

const MovieContext = createContext<never[] | MyObject[]>([]);

const formatRuntime = (time: number): string => {
  const formattedHour = Math.floor(time / 60) + "h";
  const formattedMins = (time % 60) + "m";
  return formattedHour.concat(" ", formattedMins);
};

const MovieComponent = ({ params }: { params: MovieIdType }) => {
  const [movieDetails, setMovieDetails] = useState();
  const [movieCast, setMovieCast] = useState<never[] | MyObject[]>([]);
  const [movieCrew, setMovieCrew] = useState<never[] | MyObject[]>([]);
  const [movieTrailer, setMovieTrailer] = useState<never[] | MyObject[]>([]);

  useEffect(() => {
    const getMovie = async () => {
      const details = await fetchMovieDetails(params.movieId);
      setMovieDetails(details);
      const credits = await fetchMovieCredits(params.movieId);
      const filteredCasts: never[] | MyObject[] = credits.cast.filter(
        (cast: any) => cast.order < 16
      );
      setMovieCast(filteredCasts);
      const filteredCrews: never[] | MyObject[] = credits.crew.filter(
        (crew: any) => crew.job === "Director"
      );
      setMovieCrew(filteredCrews);
      const trailer = await fetchMovieTrailer(params.movieId);
      setMovieTrailer(trailer);
    };

    if (!movieDetails || !movieCast || !movieCrew) {
      getMovie();
    }
  }, [movieCast, movieCrew, movieDetails, params.movieId]);

  return (
    <MovieContext.Provider value={movieTrailer}>
      <div className="h-max py-4 flex flex-col justify-center items-center overflow-x-hidden">
        <Suspense fallback={<Loading />}>
          <MovieDetails movieDetails={movieDetails} movieCrew={movieCrew} />
          <MovieCredits movieCast={movieCast} />
        </Suspense>
      </div>
    </MovieContext.Provider>
  );
};

export default MovieComponent;

const MovieDetails = ({
  movieDetails,
  movieCrew,
}: {
  movieDetails: any;
  movieCrew: any;
}) => {
  const formatRating = (rating: number): number => {
    return Number((rating * 10).toFixed());
  };

  const colorStatus = (rating: number): string => {
    if (formatRating(rating) > 50) {
      return "text-green-700";
    }
    return "text-red-700";
  };

  const trailer = useContext<any>(MovieContext);

  return (
    <>
      {movieDetails ? (
        <div
          className="flex flex-col w-[100vw] my-4 bg-white p-8 items-center text-black
         md:w-[95vw] md:flex-row md:items-start [&_p]:py-1"
        >
          <Image
            className="poster-details-box h-fit shadow-[10px_10px_10px_rgb(0,0,0,0.5)] rounded-xl 
             md:w-[50dvh]"
            src={
              movieDetails.poster_path
                ? `${link.moviebox_poster}${movieDetails.poster_path}`
                : `${link.no_image}`
            }
            alt={movieDetails.title}
            width={300}
            height={450}
            priority={true}
          />

          <div className="flex flex-col w-full mt-2 md:mt-0 md:mx-10 [&_p]:text-xs [&_p]:md:text-base">
            <h1 className="w-full font-bold text-center text-xl my-1 md:text-left md:w-auto md:text-3xl">
              {movieDetails.title}
              ({getYear(movieDetails.release_date)})
            </h1>

            <div className="flex md:flex-col">
              <div className="flex flex-col justify-between md:inline">
                <p className="font-bold">
                  Release date:{" "}
                  <span className="font-normal">
                    {formatDate(movieDetails.release_date)}
                  </span>
                </p>

                <p className="md:flex font-bold inline-block *:inline-block w-[40vw]">
                  Genre:&nbsp;
                  {movieDetails.genres.map(
                    (genre: { id: number; name: string }, index: number) => (
                      <span className="font-normal" key={index}>
                        {genre.name}
                        {index === movieDetails.genres.length - 1 ? "" : ","}
                      </span>
                    )
                  )}
                </p>

                <p className="font-bold">
                  Runtime:{" "}
                  <span className="font-normal">
                    {formatRuntime(movieDetails.runtime)}
                  </span>
                </p>
                <p className="italic my-2">{movieDetails.tagline}</p>
              </div>

              <div className="flex flex-col md:flex mb-4 ml-4 md:ml-0">
                <div className="w-fit h-fit flex items-center bg-white rounded-md my-4 p-1 border-2 border-black">
                  <span
                    className={`${colorStatus(
                      movieDetails.vote_average
                    )} font-extrabold text-2xl md:text-3xl`}
                  >
                    {formatRating(movieDetails.vote_average)}%
                  </span>
                  <p className="text-black text-xs font-bold w-min pl-1">
                    User Score
                  </p>
                </div>
                {trailer ? <MovieTrailer /> : null}
              </div>
            </div>

            <p className="font-bold text-xs md:text-base">
              Director:{" "}
              <span className="font-normal">
                {movieCrew.length ? movieCrew[0].name : null}
              </span>
            </p>
            <p className="font-bold text-xs md:text-base">
              Overview:{" "}
              <span className="font-normal">
                {movieDetails.overview || "Not Available"}
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

const MovieTrailer = () => {
  const trailer = useContext<any>(MovieContext);

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className={isOpen ? 'modal-video [&_iframe]:w-[320px] [&_iframe]:md:w-[100dvh] [&_iframe]:md:h-[50dvw]' : 'hidden'}>
        <ModalVideo
          classNames={{
            modalVideo: "modal-video",
            modalVideoClose: "modal-video-close",
            modalVideoBody: "modal-video-body",
            modalVideoInner: "modal-video-inner",
            modalVideoIframeWrap: "modal-video-movie-wrap",
            modalVideoCloseBtn: "modal-video-close-btn",
            modalVideoEffect: "modal-video-effect",
          }}
          channel="youtube"
          youtube={{ mute: 1, autoplay: 1 }}
          isOpen={isOpen}
          videoId={trailer[0]?.key}
          onClose={() => setOpen(false)}
        />
      </div>

      <div className={`${!trailer.length ? "hidden" : ""}`}>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center bg-red-500 w-fit font-bold text-white p-2 rounded-md text-xs text-center md:text-base
            hover:opacity-80"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"
            />
          </svg>
          Watch Trailer
        </button>
      </div>
    </>
  );
};
