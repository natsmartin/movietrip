"use server";

import { fetchFromTmdb, handleApiError, type MyObject } from "./tmdb";

export const fetchPersonMovieCredits = async (
  id: string,
): Promise<MyObject[] | undefined> => {
  try {
    const json = await fetchFromTmdb<{ cast: MyObject[] }>(`/person/${id}/movie_credits`);
    const getYear = (date: string): number => Number(date.split("-")[0] || 0);

    return json.cast
      .filter(
        (cast: MyObject) =>
          getYear(cast.release_date || "") > 2010 && cast.vote_count > 800,
      )
      .sort(
        (a: MyObject, b: MyObject) =>
          getYear(b.release_date || "") - getYear(a.release_date || ""),
      );
  } catch (error) {
    handleApiError(error);
  }
};
