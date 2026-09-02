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
      <div className="flex flex-col mx-4 justify-center *:w-full">
        <p className="font-bold text-left w-[190px] md:w-auto title">
          {truncOverview(response.title, 40)}
        </p>
        <p className="text-xs text-start my-2 md:text-base">
          Released Date:{" "}
          <span className="font-bold">{formatDate(response.release_date)}</span>
        </p>
        <p className="text-xs hidden font-bold md:text-base md:pr-4 min-[425px]:inline">
          Overview:{" "}
          <span className="font-normal">
            {truncOverview(response.overview, 130)}
          </span>
        </p>
      </div>
    </>
  );
}
