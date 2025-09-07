// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./MovieCard";

export default function MyListCard({ movie, onRemove }) {
  return (
    <div className="relative group">
      <MovieCard movie={movie} />
      <AnimatePresence>
        <motion.button
          onClick={() => onRemove(movie.id)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-xs px-2 py-1 rounded cursor-pointer"
        >
          Remove
        </motion.button>
      </AnimatePresence>
    </div>
  );
}
