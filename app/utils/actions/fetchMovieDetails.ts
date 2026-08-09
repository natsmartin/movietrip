"use server";

import { fetchFromTmdb, handleApiError, type MyObject } from "./tmdb";

export const fetchMovieDetails = async (id: string): Promise<MyObject | undefined> => {
  try {
    return await fetchFromTmdb<MyObject>(`/movie/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};
