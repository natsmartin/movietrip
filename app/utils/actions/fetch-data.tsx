'use server'

const baseURL = 'https://api.themoviedb.org/3'

export const fetchMovie = async ({ movieTitle }: { movieTitle: FormDataEntryValue | null }) => {
    const response = await fetch(`${baseURL}/search/movie?api_key=${process.env.API_KEY}&query=${movieTitle}`);
    return response.json();
}

export const fetchMovieDetails = async (id: string) => {
    const response = await fetch(`${baseURL}/movie/${id}?api_key=${process.env.API_KEY}`);
    return response.json();
}

export const fetchMovieCredits = async (id: string) => {
    const response = await fetch(`${baseURL}/movie/${id}/credits?api_key=${process.env.API_KEY}`);
    return response.json();
}