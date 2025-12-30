import React from "react";
import { assets } from "../Utils/assets";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-40">
      {/* Logo & Description */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          <div>
            <Link to="/">
              <img
                src={assets.logo}
                className="mb-5 w-32 cursor-pointer"
                alt="Logo"
              />
            </Link>
            <p className="text-primary max-w-sm font-medium">
              From the latest fashion trends to essential home goods, our mission is to provide you with high-quality items that fit perfectly into your lifestyle.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="text-xl font-medium mb-5">Company</p>
            <ul className="flex flex-col gap-2 text-primary-light">
             <Link to="/"> <li className="hover:text-black cursor-pointer">Home</li> </Link>
           <Link to="/about"> <li className="hover:text-black cursor-pointer">
                About Us
              </li> </Link> 
            <li className="hover:text-black cursor-pointer">
                Delivery
              </li> 
              <li className="hover:text-black cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <p className="text-xl font-medium mb-5 text-primary">Follow Us</p>
            <div className="flex flex-col gap-3 text-primary-light">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-black transition"
              >
                <FaFacebookF /> Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-black transition"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-black transition"
              >
                <FaTwitter /> Twitter
              </a>
            </div>
          </div>

          {/* Get in Touch */}
          <div>
            <p className="text-xl font-medium mb-5">Get in Touch</p>
            <ul className="flex flex-col gap-2 text-primary-light">
              <li>support@forever.com</li>
              <li>+8809876567</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10">
          <hr className="mb-3 border-primary/30" />
          <div className="flex flex-col items-center mb-6 text-center gap-1 text-sm text-primary-light">
            <p>
              © {new Date().getFullYear()} Forever.com — All Rights Reserved
            </p>
            <p>
              Developed by
              <span className="text-primary font-medium ml-1 ">Omit</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
