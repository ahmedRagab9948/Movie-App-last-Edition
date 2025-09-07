import FilterSection from "../components/MoviesPage/FilterSection";

export default function Series() {
  return (
    <div className=" text-white min-h-screen">
      <div className="container mx-auto px-8">
        <FilterSection mediaType="tv" />
      </div>
    </div>
  );
}
