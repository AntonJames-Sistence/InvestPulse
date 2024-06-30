import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    news: [],
    status: 'idle',
    error:  null
};

// Async thunk for fetching news
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
    const response = await fetch('/api/news');
    const data = await response.json();
    return data;
});

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default newsSlice.reducer;