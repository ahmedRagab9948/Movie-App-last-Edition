import { useState } from "react";
import monitorImg from "../../assets/images/monitor.png";
import downloadImg from "../../assets/images/dawnload.png";
import streamImg from "../../assets/images/steam.png";
import profileImg from "../../assets/images/profiles.png";

const Feature = () => {
  const [data] = useState([
    {
      id: 0,
      title: "Enjoy on your TV",
      description:
        "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      image: monitorImg,
      className: "tv",
    },
    {
      id: 1,
      title: "Download your shows to watch offline",
      description:
        "Save your favorites easily and always have something to watch.",
      image: downloadImg,
      className: "download",
    },
    {
      id: 2,
      title: "Watch everywhere",
      description:
        "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      image: streamImg,
      className: "watch",
    },
    {
      id: 3,
      title: "Create profiles for kids",
      description:
        "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
      image: profileImg,
      className: "profile",
    },
  ]);

  return (
    <div className="feature text-white">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="title mb-10 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold w-fit mx-auto sm:mx-0 relative before:absolute before:left-[40%] before:bottom-[-10px] before:w-[60px] before:h-[3px] before:bg-red-600">
            More Reasons to Join
          </h2>
        </div>

        <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((card) => (
            <div
              key={card.id}
              className="relative cursor-pointer h-[250px] sm:h-[280px] bg-gradient-to-br from-[#192247] to-[#210e17] rounded-2xl p-5 shadow-lg group overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className={card.className}>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 opacity-80 mb-3 leading-relaxed">
                  {card.description}
                </p>
              </div>
              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute bottom-3 right-3 w-20 h-20 sm:w-24 sm:h-24 object-contain transition-all duration-300 group-hover:scale-105"
                />
              )}
            </div>
          ))}
        </div>
        <div className="w-full h-[1px] my-6 bg-red-600"></div>
      </div>
    </div>
  );
};

export default Feature;
