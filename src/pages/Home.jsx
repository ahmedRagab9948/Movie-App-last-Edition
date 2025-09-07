import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending } from "../features/moviesSlice";
import HeroMovie from "../components/HomePage/HeroMovie";
import MovieSection from "../components/HomePage/MovieSection";
import Feature from "../components/HomePage/Feature";
import FaqSection from "../components/HomePage/FaqSection";
import GetStarted from "../components/HomePage/GetStarted";
import FullPageLoader from "../components/FullPageLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { trending, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (trending.length === 0) {
      dispatch(fetchTrending());
    }
  }, [dispatch, trending]);

  if (loading) return <FullPageLoader />;
  if (error) return <div className="text-white text-center py-10">{error}</div>;

  return (
    <div className="bg-black min-h-screen">
      {trending.length > 0 && <HeroMovie movies={trending.slice(0, 10)} />}
      <MovieSection mediaType="movie" />
      <MovieSection mediaType="tv" />
      <Feature />
      <FaqSection />
      <GetStarted />
    </div>
  );
};

export default Home;
