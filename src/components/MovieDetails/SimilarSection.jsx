import { useEffect, useState } from "react";
import { getSimilarMedia } from "../../Api/Tmdb";
import MovieCard from "../MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieSkeletonCard from "../MovieSkeletonCard";

const SimilarSection = ({ mediaId, mediaType }) => {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      setLoading(true);
      try {
        const results = await getSimilarMedia(mediaType, mediaId);
        setSimilar(results);
      } catch (error) {
        console.error("Error fetching similar media:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [mediaId, mediaType]);

  if (similar.length === 0) return null;

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-white mb-4">
        Similar {mediaType === "tv" ? "Series" : "Movies"}
      </h2>

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
          {similar.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="w-full h-[1px] my-6 bg-red-600"></div>
    </div>
  );
};

export default SimilarSection;
