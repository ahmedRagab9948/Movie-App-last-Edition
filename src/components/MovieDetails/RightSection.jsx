import Tabs from "./Tabs";
import OverviewTab from "./OverviewTab";
import CastSection from "./CastSection";
import ShareButtons from "./ShareButtons";

export default function RightSection({ movie, activeTab, setActiveTab }) {
  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold mb-2">{movie.title || movie.name}</h1>
      <p className="text-gray-400 mb-4">{movie.tagline}</p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "overview" && (
        <>
          <OverviewTab movie={movie} />
          <ShareButtons title={movie.title || movie.name} />
        </>
      )}
      {activeTab === "actors" && <CastSection credits={movie.credits} />}
    </div>
  );
}
