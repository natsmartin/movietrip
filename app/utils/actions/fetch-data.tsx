"use server";

import { formatDate } from "@app/sections/Details/Details";

export interface MyObject {
  [key: string]: any;
}

const baseURL = "https://api.themoviedb.org/3";
// API call to fetch movies by title
export const fetchMovie = async ({
  movieTitle,
}: {
  movieTitle: FormDataEntryValue | null;
}) => {
  try {
    const response = await fetch(
      `${baseURL}/search/movie?api_key=${process.env.API_KEY}&query=${movieTitle}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch movie details
export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await fetch(
      `${baseURL}/movie/${id}?api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch movie credits
export const fetchMovieCredits = async (id: string) => {
  try {
    const response = await fetch(
      `${baseURL}/movie/${id}/credits?api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch movie trailer
export const fetchMovieTrailer = async (id: string) => {
  try {
    const response = await fetch(
      `${baseURL}/movie/${id}/videos?api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    const json = await response.json();
    return await json.results.filter(
      (video: MyObject) => video.type === "Trailer" && video.site === "YouTube"
    );

  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch movies by category eg. (popular, top_rated, upcoming)
export const fetchMovieList = async (filter: string) => {
  try {
    const response = await fetch(
      `${baseURL}/movie/${filter}?api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch the top level details of a person
export const fetchPerson = async (id: string) => {
  try {
    const response = await fetch(
      `${baseURL}/person/${id}?api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch movie credits of a person
export const fetchPersonMovieCredits = async (id: string) => {
  try {
    const response = await fetch(
      `${baseURL}/person/${id}/movie_credits?api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

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
  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch the list of official genres for movies
export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `${baseURL}/genre/movie/list?api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch ", error);
  }
};
// API call to fetch movies by genre
export const fetchMoviesWithGenre = async (
  genres: string,
  sort: string,
  page: number
) => {
  try {
    const response = await fetch(
      `${baseURL}/discover/movie?with_genres=${genres}&sort_by=${sort}&page=${page}&api_key=${process.env.API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");

      throw new Error(response.status.toString());
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch ", error);
  }
};
