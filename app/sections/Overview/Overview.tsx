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
        className="h-[110px] w-[74px] shrink-0 object-cover sm:h-[130px] sm:w-[86px] md:h-[141px] md:w-[94px]"
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
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
        <div className="flex min-w-0 flex-1 flex-col justify-center normal-text">
          <p className="truncate text-left font-bold title">
            {truncOverview(response.title, 25)}
          </p>
          <p className="my-2 text-start text-xs leading-snug normal-text lg:text-base">
            Released Date:{" "}
            <span className="font-bold">
              {formatDate(response.release_date)}
            </span>
          </p>
        </div>
        <div className="hidden min-w-0 flex-1 items-center min-[800px]:flex">
          <p className="text-xs font-bold normal-text lg:pr-4 lg:text-base/6">
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
