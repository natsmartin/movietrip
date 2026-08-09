"use server";

import { fetchFromTmdb, handleApiError, type MovieListResponse } from "./tmdb";

export const fetchMovieList = async (
  filter: string,
): Promise<MovieListResponse | undefined> => {
  try {
    return await fetchFromTmdb<MovieListResponse>(`/movie/${filter}`);
  } catch (error) {
    handleApiError(error);
  }
};
