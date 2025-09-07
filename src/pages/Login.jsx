import { useState, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/images/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv.jpg";
import { BeatLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      emailRef.current.style.borderColor = "red";
      toast.error("Please enter a valid email");
      return false;
    } else {
      emailRef.current.style.borderColor = "green";
    }

    if (!password.trim() || password.length < 6) {
      passRef.current.style.borderColor = "red";
      toast.error("Password must be at least 6 characters");
      return false;
    } else {
      passRef.current.style.borderColor = "green";
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully 🎉");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(
        err.code === "auth/user-not-found"
          ? "No user found with this email"
          : err.code === "auth/wrong-password"
          ? "Incorrect password"
          : "Login failed, please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center text-white flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className="bg-black p-6 sm:p-8 rounded shadow w-[90%] sm:w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="new-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-transparent border border-gray-600 focus:outline-none focus:border-red-600 rounded text-white"
        />

        <div className="relative mb-4">
          <input
            ref={passRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-transparent border border-gray-600 focus:outline-none focus:border-red-600 rounded text-white pr-10"
          />
          <div
            className="absolute z-20 right-3 top-[35%] text-white cursor-pointer hover:text-red-600 transition-all duration-300 ease-in-out"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full h-12 py-2 rounded text-lg font-semibold transition flex items-center justify-center ${
            loading
              ? "bg-white cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <BeatLoader
              color="#ff0000"
              loading
              margin={2}
              size={10}
              speedMultiplier={1}
            />
          ) : (
            "Login"
          )}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
