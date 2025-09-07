import { getMyList, addToMyList } from "../firebase/firestore";
import { toast } from "react-toastify";
import { serverTimestamp } from "firebase/firestore";

/**
 * دالة لإضافة عنصر إلى قائمة My List
 * @param {Object} params - المعاملات المطلوبة
 * @param {Object} params.user - كائن المستخدم من Firebase Auth
 * @param {Object} params.item - بيانات الفيلم أو المسلسل
 */
export const handleAddToList = async ({ user, item }) => {
  if (!user) {
    toast.error("You must be logged in to add to your list.");
    return;
  }

  const loadingToast = toast.loading("Adding to your list...");

  try {
    const list = await getMyList(user.uid);
    const exists = list.some((i) => i.id === item.id);

    if (exists) {
      toast.update(loadingToast, {
        render: "This movie is already in your list.",
        type: "info",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }

    await addToMyList(user.uid, {
      id: item.id,
      title: item.title,
      poster_path: item.poster_path,
      vote_average: item.vote_average,
      media_type: item.media_type || "movie",
      timestamp: serverTimestamp(),
    });

    toast.update(loadingToast, {
      render: "Added to My List ✅",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  } catch (err) {
    toast.update(loadingToast, {
      render: "Failed to add to list ❌",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
    console.error(err);
  }
};
