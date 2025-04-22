import React, { useContext } from "react";
import Image from "next/image";
import { formatDate } from "@sections/Details/Details";
import MovieTrailer from "./MovieTrailer";
import * as link from "@assets/links";
import { MovieContext } from "./page";

const formatRuntime = (time: number): string => {
  const formattedHour = (time / 60).toFixed() + "h";
  const formattedMins = (time % 60) + "m";
  return formattedHour.concat(" ", formattedMins);
};

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
    if (formatRating(rating) > 70) {
      return "text-green-700";
    }
    return "text-red-700";
  };

  const getYear = (): string | null => {
    let year = formatDate(movieDetails.release_date);
    if (!year) return null;
    return `(${year.split(", ")[1]})`;
  };

  const movieTrailer = useContext(MovieContext);

  return (
    <>
      {movieDetails ? (
        <div className="flex flex-col w-[80vw] my-4 md:flex-row [&_p]:py-1">
          <Image
            className="h-fit shadow-3xl rounded-xl"
            src={
              movieDetails.poster_path
                ? `${link.moviebox_poster}${movieDetails.poster_path}`
                : "https://demofree.sirv.com/nope-not-here.jpg"
            }
            alt={movieDetails.title}
            width={300}
            height={450}
            priority={true}
          />

          <div className="flex flex-col w-full md:mx-10 [&_p]:text-xs [&_p]:md:text-base">
            <h1 className="w-full font-bold text-center text-xl my-1 md:text-left md:w-auto md:text-3xl">
              {movieDetails.title}
              {getYear()}
            </h1>
            <div className="flex justify-between md:inline">
              <div>
                <p className="font-bold">
                  Release date:{" "}
                  <span className="font-normal">
                    {formatDate(movieDetails.release_date)}
                  </span>
                </p>
                <div className="flex">
                  <p className="font-bold *:inline-block w-[40vw]">
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
                </div>
                <p className="font-bold">
                  Runtime:{" "}
                  <span className="font-normal">
                    {formatRuntime(movieDetails.runtime)}
                  </span>
                </p>
                <p className="italic my-2">
                  {movieDetails.tagline}
                </p>
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
                {movieTrailer ? (
                  <MovieTrailer />
                ) : null}
              </div>
            </div>
            <p className="font-bold text-xs md:text-base">
              Director:{" "}
              <span className="font-normal">
                {movieCrew ? movieCrew[0].name : null}
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

export default MovieDetails;
