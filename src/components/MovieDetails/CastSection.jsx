export default function CastSection({ credits }) {
  const cast = credits?.cast?.slice(0, 10);

  if (!cast || cast.length === 0)
    return <p className="text-gray-400">No cast info.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Top Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {cast.map((actor) => (
          <div
            key={actor.id}
            className="text-center flex flex-col items-center"
          >
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className="w-20 h-20 rounded-full bg-center bg-cover"
            />
            <p className="mt-2 font-semibold">{actor.name}</p>
            <p className="text-sm text-gray-400">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
