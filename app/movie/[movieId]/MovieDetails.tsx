import React from "react";
import Image from "next/image";
import { formatDate } from "@sections/Details/Details";
import * as link from "@assets/links";

const formatRuntime = (time: number): string => {
  const formattedHour = (time / 60).toFixed() + "h";
  const formattedMins = (time % 60) + "m";
  return formattedHour.concat(" ", formattedMins);
};

const MovieDetails = ({
  movieDetails,
  movieTrailer,
  movieCrew,
}: {
  movieDetails: any;
  movieTrailer: any;
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

          <div className="flex flex-col w-full md:mx-10">
            <h1 className="w-full font-bold text-center text-xl my-1 md:text-left md:w-auto md:text-3xl">
              {movieDetails.title}
              {getYear()}
            </h1>
            <div className="flex justify-between md:inline">
              <div>
                <p className="font-bold text-xs md:text-base">
                  Release date:{" "}
                  <span className="font-normal">
                    {formatDate(movieDetails.release_date)}
                  </span>
                </p>
                <div className="flex">
                  <p className="font-bold text-xs *:inline-block w-[40vw] md:text-base">
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
                <p className="font-bold text-xs md:text-base">
                  Runtime:{" "}
                  <span className="font-normal">
                    {formatRuntime(movieDetails.runtime)}
                  </span>
                </p>
                <p className="italic text-xs my-2 md:text-base">
                  {movieDetails.tagline}
                </p>
              </div>

              <div className="flex flex-col md:flex mb-4 ml-4 md:ml-0">
                <div className="w-fit h-fit flex items-center bg-white rounded-md my-4 p-1 border-2 border-black">
                  <p
                    className={`${colorStatus(
                      movieDetails.vote_average
                    )} font-extrabold text-2xl md:text-3xl`}
                  >
                    {formatRating(movieDetails.vote_average)}%
                  </p>
                  <p className="text-black text-xs font-bold w-[40px] pl-1">
                    User Score
                  </p>
                </div>
                {movieTrailer ? (
                  <div className={`${!movieTrailer.length ? "hidden" : ""}`}>
                    <a
                      href={`${link.movie_trailer}${movieTrailer[0]?.key}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div
                        className="flex items-center bg-red-500 w-fit font-bold text-white p-2 rounded-md
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
                        <p className="text-xs text-center md:text-base">
                          Watch Trailer
                        </p>
                      </div>
                    </a>
                  </div>
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
