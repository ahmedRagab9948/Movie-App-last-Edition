/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    id: 0,
    title: "What is Netflix?",
    description1:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    description2:
      "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
  },
  {
    id: 1,
    title: "How much does Netflix cost?",
    description1:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EGP 100 to EGP 240 a month. No extra costs, no contracts.",
    description2: "",
  },
  {
    id: 2,
    title: "Where can I watch?",
    description1:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
    description2:
      "You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    id: 3,
    title: "How do I cancel?",
    description1:
      "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
    description2: "",
  },
  {
    id: 4,
    title: "What can I watch on Netflix?",
    description1:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
    description2: "",
  },
  {
    id: 5,
    title: "Is Netflix good for kids?",
    description1:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
    description2:
      "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 sm:px-8">
        <h2 className="text-3xl font-bold mb-6 w-fit relative before:absolute before:left-[40%] before:bottom-[-10px] before:w-[60px] before:h-[3px] before:bg-red-600">
          Frequently Asked Questions
        </h2>

        <div className="space-y-0">
          {faqData.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div key={faq.id} className="accordionItem rounded-none ">
                <motion.div
                  layout="position"
                  className="rounded-none p-[5px] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-6 py-4 text-lg sm:text-xl font-semibold bg-[#2d2d2d] text-white  hover:bg-[#6e6e6e] transition "
                  >
                    {faq.title}
                    <motion.span
                      initial={false}
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      <FaChevronDown />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0.8, 0.25, 1],
                        }}
                        className="bg-[#2d2d2d] border-t border-[#1f1f1f] text-base sm:text-lg text-gray-300"
                      >
                        <div className="px-6 py-4">
                          {faq.description1 && (
                            <span className="mb-3">{faq.description1}</span>
                          )}

                          <br />
                          {faq.description2 && (
                            <span>
                              <br />
                              {faq.description2}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-[1px] my-6 bg-red-600"></div>
      </div>
    </div>
  );
}
