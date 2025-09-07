import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const GetStarted = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center text-white px-4">
      <p className="mb-5 text-center text-lg sm:text-xl">
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 items-center justify-center">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full sm:w-[65%] p-4 rounded-md bg-transparent border-2 border-gray-500 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200"
        />
        <NavLink
          to="/login"
          className="w-full sm:w-auto px-6 py-4 rounded-md bg-red-600 text-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-700 transition-all duration-200"
        >
          Get Started <IoIosArrowForward />
        </NavLink>
      </div>
    </div>
  );
};

export default GetStarted;
