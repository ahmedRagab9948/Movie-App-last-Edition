import { FaStar } from "react-icons/fa";

export default function FilterControls({
  sort,
  setSort,
  selectedYear,
  setSelectedYear,
  alphaSort,
  setAlphaSort,
  rating,
  setRating,
  resetFilters,
}) {
  const years = Array.from({ length: 45 }, (_, i) => 2024 - i);

  return (
    <div className="sort flex flex-wrap justify-between items-center w-full gap-4 mb-7">
      <div className="left-side flex flex-wrap gap-3">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#3d3c3c] px-4 py-2 rounded"
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Latest</option>
          <option value="vote_average.desc">Top Rated</option>
        </select>

        <select
          value={selectedYear || ""}
          onChange={(e) => setSelectedYear(e.target.value || null)}
          className="bg-[#3d3c3c] px-4 py-2 rounded"
        >
          <option value="">Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={alphaSort}
          onChange={(e) => setAlphaSort(e.target.value)}
          className="bg-[#3d3c3c] px-4 py-2 rounded"
        >
          <option value="">Sort</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>

        <button
          onClick={resetFilters}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
        >
          Reset Filters
        </button>
      </div>

      <div className="right-side flex items-center gap-2">
        <span className="text-sm text-yellow-300">
          <FaStar />
        </span>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="accent-amber-300"
        />
        <span className="text-yellow-300">{rating}</span>
      </div>
    </div>
  );
}
