import { useEffect, useState } from "react";
import Modal from "react-modal";
import { searchMedia } from "../../Api/Tmdb";
import MovieCard from "../MovieCard";
import SearchSkeleton from "./SearchSkeleton";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await searchMedia(searchTerm);
      const filtered = res.results.filter(
        (item) => item.poster_path && item.media_type === "movie"
      );
      setResults(filtered);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setResults([]);
    }
  }, [isOpen]);

  const handleCardClick = (item) => {
    onClose();
    const mediaType = item.media_type || "movie";
    navigate(`/${mediaType}/${item.id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Search"
      className="w-[90%] max-w-5xl bg-black text-white rounded-lg mx-auto mt-20 relative outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-white text-3xl"
      >
        &times;
      </button>

      <div className="p-4 mt-10 max-h-[70vh] overflow-y-auto pr-2">
        <div className="input px-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by movie name (min 2 characters for better results)"
            className="w-full p-3 rounded bg-transparent border-solid border-2 border-gray-600 text-white mb-4 focus:outline-none focus:border-red-600"
          />
        </div>

        {loading ? (
          <SearchSkeleton />
        ) : results.length > 0 ? (
          <>
            <p className="text-gray-400 mb-2">
              Found {results.length} result{results.length > 1 && "s"} for "
              {searchTerm}"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className="cursor-pointer"
                >
                  <MovieCard movie={item} />
                </div>
              ))}
            </div>
          </>
        ) : searchTerm.trim() !== "" ? (
          <p className="text-gray-400">No results found.</p>
        ) : null}
      </div>
    </Modal>
  );
}
