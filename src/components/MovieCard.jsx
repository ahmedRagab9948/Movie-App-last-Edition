import { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { addToMyList, removeFromMyList } from "../firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useMyList } from "../hooks/useMyList"; // if available

const MovieCard = ({ movie }) => {
  const { user } = useAuth();

  const type = movie.media_type || (movie.first_air_date ? "tv" : "movie");
  const title = movie.title || movie.name;
  const year =
    movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4);

  const [isFav, setIsFav] = useState(false);
  const [myList] = useMyList(user?.uid); // <-- optional for better performance

  useEffect(() => {
    if (myList) {
      const exists = myList.some((m) => m.id === movie.id);
      setIsFav(exists);
    }
  }, [myList, movie.id]);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("You need to login first!");
      return;
    }

    const action = isFav
      ? removeFromMyList(user.uid, movie.id)
      : addToMyList(user.uid, {
          id: movie.id,
          title,
          poster_path: movie.poster_path,
          vote_average: movie.vote_average,
          media_type: type,
        });

    toast.promise(action, {
      pending: isFav ? "Removing from My List..." : "Adding to My List...",
      success: isFav ? "Removed from My List ✅" : "Added to My List ✅",
      error: "Something went wrong ❌",
    });

    try {
      await action;
      setIsFav(!isFav);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-w-[180px] group bg-black rounded-[8px] overflow-hidden shadow transition cursor-pointer">
      <Link to={`/${type}/${movie.id}`}>
        <div className="poster-card w-full h-[270px] overflow-hidden rounded-[8px]">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={title}
            className="w-full h-full bg-center bg-cover transition-all ease-in-out duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-2 mt-1">
        <h3 className="text-[15px] font-bold truncate group-hover:text-red-600 transition ease-in-out duration-300">
          {title}
        </h3>
        <div className="bottom flex justify-between items-center mt-2">
          <div className="release-date">
            <span className="opacity-75">{year}</span>
          </div>
          <div className="icon flex justify-center items-center gap-3">
            <div
              className={`fav-icon transition ease-in-out duration-400 cursor-pointer ${
                isFav ? "text-red-600" : "text-gray-500 hover:text-red-600"
              }`}
              onClick={handleToggleFavorite}
            >
              <MdFavorite />
            </div>

            <div className="rate">
              <p className="font-bold text-[14px] text-yellow-500">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieCard;
