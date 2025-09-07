import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const validateInputs = () => {
    if (!firstName.trim() || firstName.length < 3) {
      firstRef.current.style.borderColor = "red";
      toast.error("First name must be at least 3 characters");
      return false;
    } else {
      firstRef.current.style.borderColor = "green";
    }

    if (!lastName.trim() || lastName.length < 3) {
      lastRef.current.style.borderColor = "red";
      toast.error("Last name must be at least 3 characters");
      return false;
    } else {
      lastRef.current.style.borderColor = "green";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      emailRef.current.style.borderColor = "red";
      toast.error("Enter a valid email");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      toast.success("Account created successfully ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center text-white px-4"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-0" />
      <form
        onSubmit={handleRegister}
        className="bg-black bg-opacity-80 p-8 rounded shadow w-full max-w-md z-10"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          ref={firstRef}
          type="text"
          placeholder="First Name"
          autoComplete="off"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 mb-4 bg-transparent border border-gray-600 focus:outline-none focus:border-red-600 rounded text-white"
        />
        <input
          ref={lastRef}
          type="text"
          placeholder="Last Name"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 mb-4 bg-transparent border border-gray-600 focus:outline-none focus:border-red-600 rounded text-white"
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-transparent border border-gray-600 focus:outline-none focus:border-red-600 rounded text-white"
        />
        <div className="relative mb-4">
          <input
            ref={passRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 pr-10 bg-transparent border border-gray-600 focus:outline-none focus:border-red-600 rounded text-white"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white hover:text-red-600 transition duration-200"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full h-12 py-2 rounded font-semibold transition flex items-center justify-center ${
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
            "Register"
          )}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
