"use server";

import { fetchFromTmdb, handleApiError, type MyObject } from "./tmdb";

export const fetchMovieTrailer = async (id: string): Promise<MyObject[] | undefined> => {
  try {
    const json = await fetchFromTmdb<{ results: MyObject[] }>(`/movie/${id}/videos`);

    return json.results.filter(
      (video: MyObject) => video.type === "Trailer" && video.site === "YouTube",
    );
  } catch (error) {
    handleApiError(error);
  }
};
