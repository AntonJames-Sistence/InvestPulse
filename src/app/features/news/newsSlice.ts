import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface NewsState {
    news: NewsData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;  // Allow error to be either string or null
}

interface NewsData {
    article_id: string;
    title: string;
    link: string;
    description: string | null;
    pub_date: string | null;
    image_url: string | null;
    source_url: string | null;
}

// Define the initial state
const initialState: NewsState = {
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
                state.error = action.error.message || null;
            });
    }
})

export default newsSlice.reducer;