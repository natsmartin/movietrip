"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  fetchPerson,
  fetchPersonMovieCredits,
} from "@utils/actions/fetch-data";
import Loading from "@app/loading";
import Image from "next/image";
import * as link from "@assets/links";
import { formatDate } from "@app/sections/Details/Details";
import MovieCredits from "./MovieCredits";

interface PersonIdType {
  personId: string;
}

interface PersonDetailsType {
  [key: string]: any;
}

const PersonComponent = ({ params }: { params: PersonIdType }) => {
  const [personDetails, setPersonDetails] = useState<PersonDetailsType>();
  const [movies, setMovies] = useState();

  const biography = personDetails?.biography.split("\n\n");

  useEffect(() => {
    const getPerson = async () => {
      const details = await fetchPerson(params.personId);
      setPersonDetails(details);
      console.log(details);
      const movieList = await fetchPersonMovieCredits(params.personId);
      setMovies(movieList);
      console.log(movieList);
    };
    if (!personDetails || !params.personId) {
      getPerson();
    }
  }, [personDetails, params.personId]);

  return (
    <>
      <div className="min-h-screen md:w-auto py-4 flex flex-col md:justify-center md:items-start md:flex-row">
        <Suspense fallback={<Loading />}>
          <PersonInfo personDetails={personDetails} />
          <div className="bio-box flex flex-col md:py-10 md:mt-0 md:px-10 [&_p]:text-xs [&_p]:md:text-base">
            {personDetails ? (
              <div className="bg-white dark:text-black p-0 md:p-8">
                <Name
                  personDetails={personDetails}
                  className="hidden md:flex"
                />
                <div className="hidden md:block">
                  <h2 className="font-semibold text-base mt-4 md:text-xl">
                    Biography
                  </h2>
                  {biography.map((paragraph: string, index: number) => (
                    <>
                      <p className="font-light" key={index}>
                        {paragraph}
                      </p>
                      <br />
                    </>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="md:max-lg:hidden">
              <MovieCredits movies={movies} />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="md:max-lg:flex hidden">
        <MovieCredits movies={movies} />
      </div>
    </>
  );
};

export default PersonComponent;

const PersonInfo = ({
  personDetails,
}: {
  personDetails: PersonDetailsType | undefined;
}) => {
  const formatGender = (gender: number): string | undefined => {
    let value;
    switch (gender) {
      case 0:
        value = "Not set/not specified";
        break;
      case 1:
        value = "Female";
        break;
      case 2:
        value = "Male";
        break;
      case 3:
        value = "Non-binary";
        break;
    }
    return value;
  };
  return (
    <>
      {personDetails ? (
        <div className="justify-center flex flex-col">
          <div
            className="flex flex-col items-center p-4 my-4 pt-8 text-black
             md:w-fit [&_p]:py-1 [&_p]:px-4 [&_p]:md:px-0"
          >
            <Image
              className="poster-details-box h-fit mb-4 shadow-[10px_10px_10px_rgb(0,0,0,0.5)] rounded-xl 
                 md:w-[300px]"
              src={
                personDetails.profile_path
                  ? `${link.moviebox_poster}${personDetails.profile_path}`
                  : `${link.no_image}`
              }
              alt={personDetails.name}
              width={300}
              height={450}
              priority={true}
            />

            <div className="w-auto px-0 dark:text-white md:w-[300px] md:px-8 [&_p]:py-2 [&_p]:text-xs [&_p]:md:text-base">
              <Name personDetails={personDetails} className="md:hidden" />
              <p className="font-bold">
                Also Known As: <br />
                {personDetails?.also_known_as.map(
                  (aka: string, index: number) => (
                    <>
                      <span key={index} className="font-normal">
                        {aka}
                      </span>
                      <br />
                    </>
                  )
                )}
              </p>
              <p className="font-bold">
                Birthday:{" "}
                <span className="font-normal">
                  {formatDate(personDetails.birthday)}
                </span>
              </p>
              <p className="font-bold">
                Gender:{" "}
                <span className="font-normal">
                  {formatGender(personDetails.gender)}
                </span>
              </p>
              <p className="font-bold">
                Place of Birth:{" "}
                <span className="font-normal">
                  {personDetails.place_of_birth}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

const Name = ({
  personDetails,
  className,
}: {
  personDetails: any;
  className: string;
}) => {
  return (
    <h1
      className={`w-full font-bold text-center text-xl my-1 md:text-left 
            md:w-auto md:text-3xl ${className}`}
    >
      {personDetails.name}
    </h1>
  );
};
