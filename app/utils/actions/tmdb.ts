export interface MyObject {
  [key: string]: any;
}

export interface ParamsProps {
  movieTitle: FormDataEntryValue | null;
}

export interface MovieListResponse {
  results: MyObject[];
  total_pages: number;
}

export interface MovieGenresResponse {
  genres: MyObject[];
}

export interface MovieCreditsResponse {
  cast: MyObject[];
  crew: MyObject[];
}

const baseURL = "https://api.themoviedb.org/3";

export const getTmdbErrorMessage = (status: number) => {
  if (status === 404) return "404, Not found";
  if (status === 500) return "500, internal server error";

  return status.toString();
};

export const buildTmdbUrl = (
  path: string,
  params: Record<string, string | number | null | undefined> = {}
) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("TMDb API key is missing");
  }

  const url = new URL(`${baseURL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  url.searchParams.set("api_key", apiKey);

  return url.toString();
};

export const fetchFromTmdb = async <T>(
  path: string,
  params: Record<string, string | number | null | undefined> = {}
): Promise<T> => {
  const response = await fetch(buildTmdbUrl(path, params));

  if (!response.ok) {
    throw new Error(getTmdbErrorMessage(response.status));
  }

  return (await response.json()) as T;
};

export const handleApiError = (error: unknown) => {
  console.error("Fetch ", error);
};
