"use server";

import { fetchFromTmdb, handleApiError, type MyObject } from "./tmdb";

export const fetchPerson = async (id: string): Promise<MyObject | undefined> => {
  try {
    return await fetchFromTmdb<MyObject>(`/person/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};
