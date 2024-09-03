import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: {
    isLoading: boolean,
    data: any,
    isError: boolean
} = {
    isLoading: false,
    data: null,
    isError: false
}

export type Response = {fetchMovie: typeof initialState}

export const fetchMovie = createAsyncThunk('fetchMovie',
    async ({ title, year }: { title: string, year: any }) => {
        let optionalParam = ''
        optionalParam += year > 0 ? `&y=${year}` : ''
        const response = await fetch(`http://www.omdbapi.com/?&apikey=${process.env.NEXT_PUBLIC_APIKEY}&t=${title}${optionalParam}`)
        const data = response.json()
        return data
    })

const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchMovie.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMovie.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchMovie.rejected, (state) => {
            state.isError = true;
        });
    },
    reducers: {}
})

export default todoSlice.reducer