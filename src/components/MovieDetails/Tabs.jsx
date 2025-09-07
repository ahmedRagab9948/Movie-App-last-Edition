export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = ["overview", "actors"];

  return (
    <div className="flex gap-4 border-b border-gray-600 pb-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`capitalize px-4 py-1 rounded transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white ${
            activeTab === tab ? "bg-red-600 text-white " : "text-gray-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
