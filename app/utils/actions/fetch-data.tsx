"use server";

import { formatDate } from "@app/sections/Details/Details";

export interface MyObject {
  [key: string]: any;
}

const baseURL = "https://api.themoviedb.org/3";

export const fetchMovie = async ({
  movieTitle,
}: {
  movieTitle: FormDataEntryValue | null;
}) => {
  const response = await fetch(
    `${baseURL}/search/movie?api_key=${process.env.API_KEY}&query=${movieTitle}`
  );
  return await response.json();
};

export const fetchMovieDetails = async (id: string) => {
  const response = await fetch(
    `${baseURL}/movie/${id}?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};

export const fetchMovieCredits = async (id: string) => {
  const response = await fetch(
    `${baseURL}/movie/${id}/credits?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};

export const fetchMovieTrailer = async (id: string) => {
  const response = await fetch(
    `${baseURL}/movie/${id}/videos?api_key=${process.env.API_KEY}`
  );
  const json = await response.json();
  return await json.results.filter(
    (video: MyObject) => video.type === "Trailer" && video.site === "YouTube"
  );
};

export const fetchMovieList = async (filter: string) => {
  const response = await fetch(
    `${baseURL}/movie/${filter}?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};

export const fetchPerson = async (id: string) => {
  const response = await fetch(
    `${baseURL}/person/${id}?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};

export const fetchPersonMovieCredits = async (id: string) => {
  const response = await fetch(
    `${baseURL}/person/${id}/movie_credits?api_key=${process.env.API_KEY}`
  );
  const json = await response.json();
  const getYear = (date: string): number => {
    return Number(date.split("-")[0]);
  };
  return await json.cast
    .filter(
      (cast: MyObject) =>
        getYear(cast.release_date) > 2010 && cast.vote_count > 800
    )
    .sort(
      (a: any, b: any) => getYear(b.release_date) - getYear(a.release_date)
    );
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${baseURL}/genre/movie/list?api_key=${process.env.API_KEY}`
  );
  return await response.json();
};

export const fetchMoviesWithGenre = async (genres: string, sort: string) => {
  const response = await fetch(
    `${baseURL}/discover/movie?with_genres=${genres}&sort_by=${sort}&api_key=${process.env.API_KEY}`
  );
  return await response.json();
};