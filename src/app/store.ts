import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/news/newsSlice"

const store = configureStore({
    reducer: {
        news: newsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;