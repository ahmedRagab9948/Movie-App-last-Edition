import { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-[60px]">
      {user ? (
        <>
          <img
            src={user.photoURL}
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white text-sm">{user.displayName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-1 rounded text-white text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-600 px-4 py-1 rounded text-white text-sm"
        >
          Login with Google
        </button>
      )}
    </div>
  );
}
