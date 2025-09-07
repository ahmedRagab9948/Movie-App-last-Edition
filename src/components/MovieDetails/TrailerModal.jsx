import Modal from "react-modal";

export default function TrailerModal({ isOpen, onClose, trailerUrl }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Trailer"
      className="w-[90%] max-w-5xl bg-black rounded-lg overflow-hidden mx-auto mt-20 relative outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-white text-3xl"
      >
        &times;
      </button>
      <div className="aspect-video w-full">
        <iframe
          className="w-full h-full"
          src={trailerUrl}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
}
