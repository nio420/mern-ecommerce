import React from "react";
import Title from "../Components/Title";
import { assets } from "../Utils/assets";
import NewsLetter from "../Components/NewsLetter";
import FAQ from "../Components/FAQ";

const Contact = () => {
  return (
    <section className="border-t border-gray-300 pt-10 px-4 sm:px-0">
      {/* Centered page title */}
      <div className="text-3xl text-center">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Main Container: Added lg:gap-24 for extra space on larger screens */}
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 lg:gap-28 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-120 rounded shadow-sm"
          alt="contact img"
        />

        {/* Text Container: Added pt-2 to align with top of image and w-full for layout stability */}
        <div className="flex flex-col justify-start gap-6 items-start md:pt-4 w-full md:max-w-100">
          {/* Section Title */}
          <p className="font-semibold text-xl text-gray-700">Our Store</p>

          {/* Address Info */}
          <p className="text-gray-500 leading-relaxed">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          {/* Contact Info */}
          <div className="flex flex-col gap-1">
            <p className="text-gray-500">Tel: (415) 555-0132</p>
            <p className="text-gray-500">Email: admin@forever.com</p>
          </div>

          {/* Careers Section */}
          <p className="font-semibold text-xl text-gray-700 mt-2">
            Careers at Forever
          </p>
          <p className="text-gray-500 leading-relaxed">
            Learn more about our teams and job openings.
          </p>

          {/* CTA Button */}
          <button className="border border-black px-8 py-3 rounded-lg text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>
      
      {/* FAQ and newsletter */}
      <FAQ/>
      <NewsLetter/>
    </section>
  );
};

export default Contact;