import React from "react";
import { assets } from "../Utils/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col sm:flex-row border border-gray-400 rounded-md overflow-hidden md:mt-2.5">
      {/* hero left content */}
      <div className="order-2 sm:order-1 w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <span className="w-8 md:w-11 h-0.5 bg-[#414141]"></span>
            <p className="font-medium text-sm md:text-base"> Our Best Seller</p>
          </div>
          {/* heading */}
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Collection
          </h1>
          <div className="flex items-center gap-2">
            <Link to="/collection" className="font-semibold text-sm md:text-base text-white bg-primary px-5 py-2 md:px-4 md:py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-black hover:scale-103 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-light cursor-pointer">
              Shop Now
            </Link>

            <span className="w-8 md:w-11 h-0.5 bg-[#414141]"></span>
          </div>
        </div>
      </div>
      {/* hero right content */}
      <img src={assets.hero_img} className="w-full sm:w-1/2 order-1 sm:order-2" alt="" />
    </section>
  );
};

export default Hero;
