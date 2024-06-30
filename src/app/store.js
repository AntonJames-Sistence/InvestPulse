import { configureStore } from "@reduxjs/toolkit";
// import booksReducer from "../features/booksSlice";

export default configureStore({
    reducer: {
        news: newsReducer,
    },
});