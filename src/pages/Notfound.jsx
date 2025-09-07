import { Link } from "react-router-dom";
import img from "../assets/images/404 Error-rafiki.svg";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <div className="image w-full max-w-md mb-2 transform-gpu transition duration-500 ease-in-out hover:scale-105 ">
        <img src={img} alt="404 Not Found" />
      </div>
      <h3 className="text-xl">Something went wrong.</h3>
      <p className="text-sm mb-4">
        Sorry, We can’t find the page you’re looking for.
      </p>
      <Link
        to="/"
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
