import { FaPlay } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { handleAddToList } from "../../functions/handleAddToList";
import { toast } from "react-toastify";

export default function LeftSection({
  posterPath,
  trailerUrl,
  setIsTrailerOpen,
  movie: movieData,
  mediaType,
}) {
  const { user } = useAuth();

  const handlePlay = () => {
    if (trailerUrl) {
      setIsTrailerOpen(true);
    } else {
      alert("No trailer available");
    }
  };

  const handleAdd = () => {
    if (!user) {
      toast.error("Please login to add to your list.");
      return;
    }
    const normalizedItem = {
      id: movieData.id,
      title: movieData.title || movieData.name || "Untitled",
      poster_path: movieData.poster_path,
      vote_average: movieData.vote_average,
      media_type: mediaType,
    };
    handleAddToList({ user, item: normalizedItem });
  };

  return (
    <div className="md:h-[450px] h-[450px] w-full md:w-1/3">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt="Movie Poster"
        className="rounded-xl w-full h-full bg-cover bg-center"
      />
      <div className="btns flex items-center justify-center gap-4 mt-4">
        <button
          className="bg-red-600 transition-all duration-300 ease-in-out hover:bg-red-700 py-3 px-12 md:px-16 rounded-full font-semibold text-lg flex justify-center items-center gap-2"
          onClick={handlePlay}
        >
          <FaPlay /> Play
        </button>
        <button
          onClick={handleAdd}
          className="bg-cyan-600 transition-all duration-300 ease-in-out hover:bg-cyan-700 py-3 px-6 md:px-12 rounded-full font-semibold text-lg flex justify-center items-center gap-2"
        >
          ＋ Add to List
        </button>
      </div>
    </div>
  );
}
