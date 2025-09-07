import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/images/meezan loader.json"; // مسار ملف JSON

export default function FullPageLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // يخفي اللودر بعد وقت معين
    }, 5000); // 2000 = 2 ثانية

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null; // لا تظهر أي شيء بعد انتهاء الوقت

  return (
    <div className="flex items-center justify-center min-h-screen bg-black fixed top-0 left-0 right-0 bottom-0 w-full z-50 ">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ width: 150 }}
      />
    </div>
  );
}
