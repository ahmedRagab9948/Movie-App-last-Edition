import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTrendingMovies } from "../Api/Tmdb";

export const fetchTrending = createAsyncThunk(
  "movies/fetchTrending",
  async () => {
    const movies = await getTrendingMovies();
    return movies;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    trending: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrending.rejected, (state) => {
        state.loading = false; // مهم لتوقيف اللودر عند الخطأ
      });
  },
});

export default moviesSlice.reducer;
