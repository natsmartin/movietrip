"use server";

import { fetchFromTmdb, handleApiError, type MovieListResponse } from "./tmdb";

export const fetchMoviesWithGenre = async (
  genres: string,
  sort: string,
  page: number,
): Promise<MovieListResponse | undefined> => {
  try {
    return await fetchFromTmdb<MovieListResponse>("/discover/movie", {
      with_genres: genres,
      sort_by: sort,
      page,
    });
  } catch (error) {
    handleApiError(error);
  }
};
