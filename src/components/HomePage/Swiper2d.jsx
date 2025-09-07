import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FaPlay } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { handleAddToList } from "../../functions/handleAddToList";
import { toast } from "react-toastify";

const SwiperComponents = ({ movies, trailerUrl, setIsTrailerOpen }) => {
  const { user } = useAuth();

  const handlePlay = () => {
    if (trailerUrl) {
      setIsTrailerOpen(true);
    } else {
      toast.info("No trailer available");
    }
  };

  const handleAdd = (movie) => {
    handleAddToList({ user, item: movie });
  };
  return (
    <>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="w-full h-[90vh] sm:h-[100vh]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="relative w-full h-full bg-cover bg-center text-white flex items-center"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

              <div className="container mx-auto px-4 sm:px-8">
                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-4 mb-4 text-sm sm:text-base">
                    <span className="text-yellow-400 font-semibold">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="opacity-75">
                      {movie.release_date?.slice(0, 4) ||
                        movie.first_air_date?.slice(0, 4)}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-12">
                    {movie.title || movie.name}
                  </h2>

                  <p className="text-gray-200 text-sm sm:text-base mb-8 sm:mb-14 line-clamp-3">
                    {movie.overview}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handlePlay}
                      className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/50 px-6 sm:px-10 py-3 rounded-full font-semibold flex justify-center items-center gap-2 cursor-pointer duration-300 ease-in-out text-sm sm:text-base"
                    >
                      <FaPlay /> Watch
                    </button>

                    <button
                      onClick={() => handleAdd(movie)}
                      className="bg-cyan-600 transition-all duration-300 ease-in-out hover:bg-cyan-700 py-3 px-6 md:px-12 rounded-full font-semibold text-lg flex justify-center items-center gap-2 "
                    >
                      ＋ Add to List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      ;
    </>
  );
};

export default SwiperComponents;
