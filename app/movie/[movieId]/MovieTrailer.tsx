import React, { useContext } from "react";
import { MovieContext } from "./page";
import * as link from "@assets/links";

const MovieTrailer = () => {
  const trailer = useContext<any>(MovieContext);

  return (
    <div className={`${!trailer.length ? "hidden" : ""}`}>
      <a
        href={`${link.movie_trailer}${trailer[0]?.key}`}
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
          <p className="text-xs text-center md:text-base">Watch Trailer</p>
        </div>
      </a>
    </div>
  );
};

export default MovieTrailer;
