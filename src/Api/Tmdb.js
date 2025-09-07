import axios from "axios";

const API_KEY = "22e70cdaca91efb3fc811d77b8398922";
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

// Get Trending Movies Function

export const getTrendingMovies = async () => {
  const res = await tmdb.get("/trending/movie/week");
  return res.data.results;
};

// Get Genres Function
export const getGenres = async () => {
  const res = await tmdb.get("/genre/movie/list");
  return res.data.genres;
};

export const searchMedia = async (query) => {
  const res = await tmdb.get(`/search/multi`, {
    params: {
      query,
    },
  });
  return res.data;
};

// Get Similar Media Function
export const getSimilarMedia = async (mediaType, id) => {
  const res = await tmdb.get(`/${mediaType}/${id}/similar`);
  return res.data.results;
};

// Get Recommended Media Function
export const getRecommendedMedia = async (mediaType, id) => {
  const res = await tmdb.get(`/${mediaType}/${id}/recommendations`);
  return res.data.results;
};
