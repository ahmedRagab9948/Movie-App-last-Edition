import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { tmdb } from "../Api/Tmdb";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";
import LeftSection from "../components/MovieDetails/LeftSection";
import TrailerModal from "../components/MovieDetails/TrailerModal";
import RightSection from "../components/MovieDetails/RightSection";
import SimilarSection from "../components/MovieDetails/SimilarSection";
import RecommendationsSection from "../components/MovieDetails/RecommendationsSection";

export default function MovieDetails() {
  const { id } = useParams();
  const location = useLocation();
  const mediaType = location.pathname.includes("/tv/") ? "tv" : "movie";

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await tmdb.get(`/${mediaType}/${id}`, {
          params: { append_to_response: "recommendations,credits,videos" },
        });
        setMovie(res.data);
        setRecommendations(res.data.recommendations?.results || []);

        const trailer = res.data.videos?.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } catch (err) {
        console.error("Failed to fetch details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, mediaType]);

  if (loading || !movie) return <MovieDetailsSkeleton />;

  return (
    <>
      <div className="text-white py-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col gap-24 md:flex-row md:gap-10">
            <LeftSection
              posterPath={movie.poster_path}
              trailerUrl={trailerUrl}
              setIsTrailerOpen={setIsTrailerOpen}
              movie={movie}
              mediaType={mediaType}
            />
            <RightSection
              movie={movie}
              mediaType={mediaType}
              recommendations={recommendations}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          {/* {Recommendations Section} */}
          <div className="recommendation-movies-sec">
            <RecommendationsSection
              mediaId={movie.id}
              recommendations={recommendations}
              mediaType={mediaType}
            />
          </div>
          {/* {Recommendations Section} */}

          <div className="similar-movies-sec">
            <SimilarSection mediaId={movie.id} mediaType={mediaType} />
          </div>
        </div>
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={trailerUrl}
      />
    </>
  );
}
