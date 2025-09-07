import { useState, useEffect } from "react";
import FullPageLoader from "./FullPageLoader";

export default function SplashWrapper({ children }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("splashShown");
    if (hasShown) {
      setShowSplash(false);
    } else {
      const timer = setTimeout(() => {
        sessionStorage.setItem("splashShown", "true");
        setShowSplash(false);
      }, 4000); // مدة العرض 4 ثواني مثلاً

      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) return <FullPageLoader />;
  return children;
}
