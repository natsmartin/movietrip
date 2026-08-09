"use server";

import { fetchFromTmdb, handleApiError, type MovieListResponse } from "./tmdb";

export const fetchMovie = async (
  title: string | null,
  page: number,
): Promise<MovieListResponse | undefined> => {
  try {
    return await fetchFromTmdb<MovieListResponse>("/search/movie", {
      page,
      query: title,
    });
  } catch (error) {
    handleApiError(error);
  }
};
