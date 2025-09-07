import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../Api/Tmdb";
import { toast } from "react-toastify";

export const useMovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await tmdb.get(`/movie/${id}`);
        setMovie(res.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Failed to load movie details");
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, id };
};
