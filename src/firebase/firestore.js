import { db } from "./firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

// إضافة عنصر للمفضلة
export const addToMyList = async (userId, movie) => {
  const movieRef = doc(db, "users", userId, "myList", movie.id.toString());
  await setDoc(movieRef, movie);
};

// حذف عنصر من المفضلة
export const removeFromMyList = async (userId, movieId) => {
  const movieRef = doc(db, "users", userId, "myList", movieId.toString());
  await deleteDoc(movieRef);
};

// جلب عناصر المفضلة
export const getMyList = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "myList"));
  return snapshot.docs.map((doc) => doc.data());
};

// إضافة تقييم مستخدم
export const addUserRating = async ({
  userId,
  movieId,
  rating,
  media_type,
}) => {
  const q = query(
    collection(db, "ratings"),
    where("userId", "==", userId),
    where("movieId", "==", movieId)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    throw new Error("You already rated this movie.");
  }

  await addDoc(collection(db, "ratings"), {
    userId,
    movieId,
    rating,
    media_type,
    timestamp: serverTimestamp(),
  });
};

// جلب التقييم الخاص بمستخدم لعمل معين
export const getUserRating = async ({ userId, movieId }) => {
  const q = query(
    collection(db, "ratings"),
    where("userId", "==", userId),
    where("movieId", "==", movieId)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return snapshot.docs[0].data().rating;
  }

  return null;
};
