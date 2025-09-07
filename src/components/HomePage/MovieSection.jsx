import { useState, useEffect } from "react";
import { tmdb } from "../../Api/Tmdb";
import MovieCard from "../MovieCard";
import MovieSkeletonCard from "../MovieSkeletonCard";
import { IoMdTrendingUp } from "react-icons/io";
import { FaFire, FaStar, FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./moviesSection.css";

const MovieSection = ({ mediaType = "movie" }) => {
  const tabs = [
    { label: "Popular", icon: <FaFire />, endpoint: `/${mediaType}/popular` },
    {
      label: "Premieres",
      icon: <FaStar />,
      endpoint: `/${mediaType}/now_playing`,
    },
    {
      label: "Recently Added",
      icon: <FaPlus />,
      endpoint: `/${mediaType}/upcoming`,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await tmdb.get(activeTab.endpoint);
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchMovies();
  }, [activeTab]);

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 sm:px-8">
        {/* Title and Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start text-base font-medium gap-6 md:gap-0">
          <div className="sec-title relative flex gap-2 items-center mb-10 text-center sm:text-left">
            <span className="text-2xl font-bold text-red-600">
              <IoMdTrendingUp />
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold w-fit mx-auto sm:mx-0 relative before:absolute before:left-[30%] before:bottom-[-15px] before:w-[60px] before:h-[3px] before:bg-red-600">
              Trending {mediaType}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide text-sm sm:text-base sm:mt-[10px]">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap ${
                  activeTab.label === tab.label
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-400 hover:text-white"
                } pb-1 transition flex items-center gap-2`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-[1px] mb-6 bg-gray-700"></div>

        {/* Swiper or Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <MovieSkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={6}
            speed={1000}
            loop={true}
            autoplay={{ delay: 2000 }}
            navigation={true}
            breakpoints={{
              0: { slidesPerView: 1.5 },
              480: { slidesPerView: 2.5 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="overflow-x-visible"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie} mediaType={mediaType} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="w-full h-[1px] my-6 bg-red-600"></div>
      </div>
    </div>
  );
};

export default MovieSection;
