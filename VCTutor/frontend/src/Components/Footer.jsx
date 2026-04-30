import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-10">
      
      {/* INNER CONTAINER (centered content) */}
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8">
          
          {/* ABOUT SECTION */}
          <div className="max-w-sm">
            <Link to="/" className="bold-24 flex mb-4">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-yellow-400 text-black rounded-full">
                  VC
                </span>
                VCtutor
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              We connect students with certified online tutors from around the globe. 
              Whether you're preparing for exams or mastering new skills, our platform 
              helps you learn with confidence.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="hover:text-white transition">
                  Tutors
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT SECTION */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-gray-400 text-sm">+91-987-456-321</p>
            <p className="text-gray-400 text-sm">support@vctutor.com</p>
          </div>

        </div>

        {/* LINE */}
        <hr className="border-none h-[1px] bg-white/20 mt-10" />

        {/* COPYRIGHT */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} VCTutor. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;