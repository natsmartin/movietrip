"use server";

import { fetchFromTmdb, handleApiError, type MovieGenresResponse } from "./tmdb";

export const fetchGenres = async (): Promise<MovieGenresResponse | undefined> => {
  try {
    return await fetchFromTmdb<MovieGenresResponse>("/genre/movie/list");
  } catch (error) {
    handleApiError(error);
  }
};
