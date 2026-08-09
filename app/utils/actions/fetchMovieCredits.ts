"use server";

import { fetchFromTmdb, handleApiError, type MovieCreditsResponse } from "./tmdb";

export const fetchMovieCredits = async (
  id: string,
): Promise<MovieCreditsResponse | undefined> => {
  try {
    return await fetchFromTmdb<MovieCreditsResponse>(`/movie/${id}/credits`);
  } catch (error) {
    handleApiError(error);
  }
};
