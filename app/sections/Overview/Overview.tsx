import React from "react";
import Image from "next/image";
import { Movie } from "../MovieBox/MovieBox";
import { movielist_poster, no_image } from "@assets/links";

export const formatDate = (date: string) => {
  if (!date) {
    return "Not Available";
  }
  const isoDate = new Date(date);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return dateTimeFormat.format(isoDate);
};

export default function Details({ response }: { response: Movie }) {
  const truncOverview = (overview: string, maxLength: number) => {
    if (overview.length > maxLength) {
      return overview.slice(0, maxLength) + "...";
    }
    return overview;
  };

  return (
    <>
      <Image
        className="md:w-[94px] md:h-[141px]"
        src={
          response.poster_path
            ? `${movielist_poster}${response.poster_path}`
            : `${no_image}`
        }
        alt={response.title}
        width={94}
        height={115}
        priority={true}
      />
      <div className="flex mx-4 md:mx-2 justify-center">
        <div className="flex flex-col mx-2 justify-center normal-text lg:w-3/6 md:mx-2">
          <p className="font-bold text-left title">
            {truncOverview(response.title, 25)}
          </p>
          <p className="text-xs text-start my-2 normal-text lg:text-base">
            Released Date:{" "}
            <span className="font-bold">
              {formatDate(response.release_date)}
            </span>
          </p>
        </div>
        <div className="flex mx-4 items-center w-0 lg:w-5/6 md:mx-2 *:w-full">
          <p className="text-xs hidden font-bold normal-text lg:text-base/6 lg:pr-4 min-[800px]:inline">
            Overview:{" "}
            <span className="font-normal normal-text">
              {truncOverview(response.overview, 130)}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
