import React from "react";
import {
  FaEnvelope,
  FaHeadphones,
  FaPhone,
} from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  return (
    <section className="max-padd-container my-24">
      
      {/* Contact Form and Details */}
      <div className="flex flex-col xl:flex-row gap-20 py-6">

        {/* Contact Form */}
        <div>
          
          {/* Title */}
          <div className="max-w-lg pb-6">
            <h3 className="h3 capitalize">
              Get <span className="font-[400]">in Touch</span>
            </h3>
            <p>
              Have questions or need help? Send us a message, and we'll get back
              to you as soon as possible.
            </p>
          </div>

          {/* Form */}
          <form>
            <div className="flex gap-x-5">
              
              {/* Name */}
              <div className="w-1/2 mb-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-white rounded"
                />
              </div>

              {/* Email */}
              <div className="w-1/2 mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-white rounded"
                />
              </div>

            </div>

            {/* Message */}
            <div className="mb-4">
              <textarea
                id="message"
                rows="4"
                placeholder="Write your message here"
                className="w-full mt-1 py-1.5 px-3 border-none ring-1 ring-slate-900/5 regular-14 bg-white rounded resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="btn-secondary rounded shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-6">

          <div className="flex items-center gap-3">
            < FaLocationDot />
            <p>Puttur,India</p>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone />
            <p>+91-987-456-321</p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope />
            <p>support@vctutors.com</p>
          </div>

          <div className="flex items-center gap-3">
            <FaHeadphones />
            <p>24/7 Support</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;