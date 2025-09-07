import {
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaLink,
} from "react-icons/fa";

export default function ShareButtons({ title }) {
  const shareUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
      >
        <FaFacebookF /> Facebook
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=Check out ${title}`}
        target="_blank"
        rel="noreferrer"
        className="bg-sky-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-sky-600"
      >
        <FaTwitter /> Twitter
      </a>

      <a
        href={`https://t.me/share/url?url=${shareUrl}&text=${title}`}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
      >
        <FaTelegramPlane /> Telegram
      </a>

      <button
        onClick={copyLink}
        className="bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-600"
      >
        <FaLink /> Copy Link
      </button>
    </div>
  );
}
