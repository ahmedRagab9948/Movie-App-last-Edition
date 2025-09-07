export default function OverviewTab({ movie }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Overview</h2>
      <p className="text-gray-300">{movie.overview}</p>
    </div>
  );
}
