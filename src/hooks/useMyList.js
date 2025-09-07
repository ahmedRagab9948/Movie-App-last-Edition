import { useEffect, useState } from "react";
import { getMyList } from "../firebase/firestore";

export function useMyList(userId) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setList([]);
      setLoading(false);
      return;
    }

    const fetchList = async () => {
      setLoading(true);
      try {
        const data = await getMyList(userId);
        setList(data);
      } catch (error) {
        console.error("Failed to fetch My List:", error);
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [userId]);

  return [list, setList, loading];
}
