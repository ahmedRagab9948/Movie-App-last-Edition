/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import SearchModal from "./SearchModal/SearchModal";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

export default function Navbar() {
  const headerRef = useRef();
  const drawerRef = useRef();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        headerRef.current.style.backgroundColor = "#000000";
        headerRef.current.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.5)";
      } else {
        headerRef.current.style.backgroundColor = "transparent";
        headerRef.current.style.boxShadow = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-red-600 font-semibold" : "hover:text-red-400";

  const handleLogout = useCallback(() => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error("Failed to log out");
      });
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className={navLinkClass}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          onClick={() => setMenuOpen(false)}
          className={navLinkClass}
        >
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/series"
          onClick={() => setMenuOpen(false)}
          className={navLinkClass}
        >
          Series
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-list"
          onClick={() => setMenuOpen(false)}
          className={navLinkClass}
        >
          My List
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <header
        ref={headerRef}
        className="py-[10px] bg-transparent text-white shadow-none fixed top-0 z-50 w-full transition-all duration-[0.5s] ease-in-out"
      >
        <div className="container mx-auto px-8">
          <nav className="flex items-center justify-between py-4 transition-all duration-200 ease-out">
            <Link to="/" className="text-xl font-bold text-red-600">
              NETFLIX
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-6">{navLinks}</ul>

            {/* Right Side */}
            <div className="hidden md:flex gap-4 items-center">
              <FaSearch
                onClick={() => setIsSearchOpen(true)}
                className="cursor-pointer hover:text-red-400"
              />
              {user ? (
                <>
                  <span className="text-sm text-red-600">
                    {user.displayName || ""}
                  </span>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className={`px-3 py-1 rounded text-sm transition ${
                      loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 cursor-pointer"
                    }`}
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </>
              ) : (
                <NavLink to="/login">
                  <FaUserCircle className="text-2xl cursor-pointer hover:text-red-400" />
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              {menuOpen ? (
                <FaTimes
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl cursor-pointer"
                />
              ) : (
                <FaBars
                  onClick={() => setMenuOpen(true)}
                  className="text-2xl cursor-pointer"
                />
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu & Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay with blur */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.div
              key="mobile-drawer"
              ref={drawerRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 left-0 w-[100%] flex flex-col items-center justify-center sm:w-[60%] h-full bg-black z-40 p-6 space-y-6 text-white shadow-lg md:hidden"
            >
              <ul className="flex flex-col gap-6 text-lg font-bold">
                {navLinks}
              </ul>

              <div className="flex flex-col gap-6 items-center pt-6 border-t border-gray-700">
                <FaSearch
                  onClick={() => {
                    setIsSearchOpen(true);
                    setMenuOpen(false);
                  }}
                  className="cursor-pointer hover:text-red-400"
                />
                {user ? (
                  <>
                    <span className="text-md font-bold text-red-600">
                      {user.displayName || ""}
                    </span>
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className={`px-10 py-2 rounded text-md font-bold transition ${
                        loading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 cursor-pointer"
                      }`}
                    >
                      {loading ? "Logging out..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <NavLink to="/login">
                    <FaUserCircle className="text-2xl cursor-pointer hover:text-red-400" />
                  </NavLink>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
