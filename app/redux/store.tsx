import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '@app/redux/slice/todo'

export const store = configureStore({
    reducer: {
        fetchMovie: todoReducer
    }
})