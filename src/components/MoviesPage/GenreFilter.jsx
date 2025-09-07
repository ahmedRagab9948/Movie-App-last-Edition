import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./genreFilter.css";

export default function GenreFilter({
  genres,
  selectedGenre,
  setSelectedGenre,
}) {
  return (
    <div className="genre-swiper w-full mb-6">
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        navigation={true}
        modules={[Navigation]}
        className="overflow-visible"
      >
        <SwiperSlide style={{ width: "auto" }}>
          <button
            onClick={() => setSelectedGenre(null)}
            className={`px-4 py-1 rounded-full border w-full transition whitespace-nowrap ${
              selectedGenre === null
                ? "bg-red-600 text-white border-red-600"
                : "bg-[#3d3c3c] text-white border-black hover:bg-red-600"
            }`}
          >
            All
          </button>
        </SwiperSlide>

        {genres.map((genre) => (
          <SwiperSlide key={genre.id} style={{ width: "auto" }}>
            <button
              onClick={() => setSelectedGenre(genre.id)}
              className={`px-4 py-1 rounded-full border w-full transition whitespace-nowrap ${
                selectedGenre === genre.id
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-[#3d3c3c] text-white border-black hover:bg-red-600"
              }`}
            >
              {genre.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
