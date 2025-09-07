export default function PaginationControls({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-[#3d3c3c] text-white rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-lg">
        {page} / {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 bg-[#3d3c3c] text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
