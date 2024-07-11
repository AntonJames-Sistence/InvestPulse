import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface NewsData {
    article_id: string;
    title: string;
    link: string;
    description: string | null;
    pub_date: string | null;
    image_url: string | null;
    source_url: string | null;
}

interface NewsState {
    news: NewsData[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// Async thunk for fetching news
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
    const response = await fetch('/api/news');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
});

const initialState: NewsState = {
    news: [],
    status: 'idle',
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsData[]>) => {
                state.status = 'succeeded';
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch news';
            });
    },
});

export default newsSlice.reducer;