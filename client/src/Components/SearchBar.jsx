import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../Utils/assets";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"; // 1. Added Framer Motion

const SearchBar = () => {
  const { search, setSearch, ShowSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // 2. Wrap the return in AnimatePresence and use motion.div
  return (
    <AnimatePresence>
      {ShowSearch && visible ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}   // Starting state
          animate={{ height: "auto", opacity: 1 }} // Entrance state
          exit={{ height: 0, opacity: 0 }}      // Exit state
          transition={{ duration: 0.4, ease: "easeInOut" }} // Animation speed
          className="border-t border-gray-200 bg-gray-50 overflow-hidden"
        >
          <div className="flex items-center justify-center py-6 px-4">
            {/* Search Input Container */}
            <div className="inline-flex items-center justify-between border border-gray-300 px-5 py-3 rounded-full w-full max-w-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="flex-1 outline-none text-base text-gray-700 bg-transparent"
                placeholder="Search for products..."
              />
              <img
                src={assets.search_icon}
                className="w-4 ml-3 opacity-60"
                alt="search"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowSearch(false)}
              className="ml-4 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            >
              <img
                src={assets.cross_icon}
                alt="close"
                className="w-3 opacity-70 cursor-pointer"
              />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SearchBar;