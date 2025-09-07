import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MovieDetailsSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 px-8 py-12 text-white">
      {/* Poster */}
      <div className="w-full lg:w-1/3">
        <Skeleton height={450} borderRadius={8} />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-4">
        <Skeleton width={300} height={40} />
        <Skeleton width={150} height={25} />
        <Skeleton count={3} />
        <div className="flex gap-2">
          <Skeleton width={100} height={40} />
          <Skeleton width={140} height={40} />
        </div>
        <Skeleton count={2} />
        <Skeleton height={200} />
      </div>
    </div>
  );
}
