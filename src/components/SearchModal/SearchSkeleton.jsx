export default function SearchSkeleton() {
  return (
    <div className="animate-pulse p-2 border-b border-gray-800 flex gap-4 items-center">
      <div className="w-[50px] h-[70px] bg-gray-700 rounded-md" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-gray-700 rounded" />
        <div className="h-3 w-1/2 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
