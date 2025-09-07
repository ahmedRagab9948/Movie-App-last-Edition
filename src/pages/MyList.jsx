/* eslint-disable no-unused-vars */
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { removeFromMyList } from "../firebase/firestore";
import { useMyList } from "../hooks/useMyList";
import MyListCard from "../components/MyListCard";
import { useState } from "react";

export default function MyList() {
  const { user } = useAuth();
  const [list, setList] = useMyList(user?.uid);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRemove = async (movieId) => {
    if (!user) return;
    const toastId = toast.loading("Removing...");

    try {
      await removeFromMyList(user.uid, movieId);
      const newList = list.filter((item) => item.id !== movieId);
      setList(newList);

      toast.update(toastId, {
        render: "Removed successfully ✅",
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });

      if (newList.length === 0) {
        toast.info("Your list is now empty.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to remove movie ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handleClearAll = async () => {
    if (!user) return;

    const confirm = window.confirm("Are you sure you want to clear your list?");
    if (!confirm) return;

    const toastId = toast.loading("Clearing your list...");

    try {
      for (const movie of list) {
        await removeFromMyList(user.uid, movie.id);
      }

      setList([]);
      toast.update(toastId, {
        render: "All items removed successfully ✅",
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to clear list ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const filteredList = list.filter((movie) =>
    (movie.title || movie.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white py-20">
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My List</h2>
          {list.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold"
            >
              Clear All
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <p className="text-gray-400">You haven't added anything yet.</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search your list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[300px] mb-6 px-4 py-2 rounded bg-[#2d2d2d] text-white border border-gray-700"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredList.map((movie) => (
                <MyListCard
                  key={movie.id}
                  movie={movie}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
