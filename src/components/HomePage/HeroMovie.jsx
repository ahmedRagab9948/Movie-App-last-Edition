import SwiperComponents from "./Swiper2d";
// import Swiper2d from "./Swiper2d";

const HeroMovie = ({ movies }) => {
  return (
    <div className="custom-swiper h-screen  md:mb-7">
      <SwiperComponents movies={movies} />
    </div>
  );
};

export default HeroMovie;
