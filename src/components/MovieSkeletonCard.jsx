import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieSkeletonCard = () => {
  return (
    <div className="bg-[#1a1a1a] rounded overflow-hidden shadow">
      <Skeleton height={270} baseColor="#1f2937" highlightColor="#374151" />
      <div className="p-2">
        <Skeleton height={20} width="80%" className="mb-2" />
        <Skeleton height={15} width="60%" />
      </div>
    </div>
  );
};

export default MovieSkeletonCard;
