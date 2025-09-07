/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getGenres, tmdb } from "../../Api/Tmdb";
import GenreFilter from "./GenreFilter";
import FilterControls from "./FilterControls";
import MovieResults from "./MovieResults";
import PaginationControls from "./PaginationControls";

export default function FilterSection({ mediaType = "movie" }) {
  const years = Array.from({ length: 45 }, (_, i) => 2024 - i);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [alphaSort, setAlphaSort] = useState("");
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("popularity.desc");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("movieFilters"));
    if (savedFilters) {
      setSelectedGenre(savedFilters.selectedGenre);
      setSelectedYear(savedFilters.selectedYear);
      setAlphaSort(savedFilters.alphaSort);
      setRating(savedFilters.rating);
      setSort(savedFilters.sort);
    }
  }, []);

  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  useEffect(() => {
    const fetchFiltered = async () => {
      setLoading(true);

      localStorage.setItem(
        "movieFilters",
        JSON.stringify({ selectedGenre, selectedYear, alphaSort, rating, sort })
      );

      const res = await tmdb.get(`/discover/${mediaType}`, {
        params: {
          with_genres: selectedGenre || undefined,
          sort_by: sort,
          "vote_average.gte": rating,
          primary_release_year: selectedYear || undefined,
          page,
        },
      });

      let results = res.data.results;
      setTotalPages(res.data.total_pages);

      if (alphaSort === "az") {
        results.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      } else if (alphaSort === "za") {
        results.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
      }

      setMovies(results);
      setLoading(false);
    };

    fetchFiltered();
  }, [selectedGenre, rating, sort, selectedYear, alphaSort, page]);

  const resetFilters = () => {
    setSelectedGenre(null);
    setSelectedYear(null);
    setAlphaSort("");
    setRating(0);
    setSort("popularity.desc");
    setPage(1);
    localStorage.removeItem("movieFilters");
  };

  return (
    <div className="filterSection pt-[80px] pb-[20px] text-white">
      <h2 className="text-2xl font-bold mb-4">
        {mediaType === "tv" ? "TV Shows" : "Movies"}
      </h2>
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <FilterControls
        years={years}
        sort={sort}
        setSort={setSort}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        alphaSort={alphaSort}
        setAlphaSort={setAlphaSort}
        rating={rating}
        setRating={setRating}
        resetFilters={resetFilters}
      />

      <MovieResults movies={movies} loading={loading} />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
