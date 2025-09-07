import MovieCard from "../MovieCard";
import MovieSkeletonCard from "../MovieSkeletonCard";

export default function MovieResults({ movies, loading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {loading
        ? [...Array(10)].map((_, i) => <MovieSkeletonCard key={i} />)
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
