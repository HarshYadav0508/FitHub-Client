import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 dark:bg-dark dark:text-white py-8 px-8">
    <div className="max-w-screen-xl mx-auto">
      {/* Header and Subscription */}
      <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4">Want to Subscribe to our Newsletter?</h1>
          <div className="flex justify-center items-center">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-full border border-r-0 focus:outline-none w-64"
              />
              <button className="px-6 py-2 bg-secondary text-white rounded-r-full">
                Subscribe
              </button>
              
            </div>
          </div>
        </div>

      {/* Footer Columns */}
      <div className="flex flex-wrap gap-6 justify-between">
        {/* Contact Column */}
        <div className="w-full lg:w-2/5 text-center lg:text-left">
          <p className="text-lg font-semibold mb-4">
            Our experienced instructors will guide you through structured lessons, helping you develop a solid foundation while nurturing your creativity.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <FaInstagram className="text-2xl text-secondary" />
            <FaFacebook className="text-2xl text-secondary" />
            <FaTwitter className="text-2xl text-secondary" />
            <FaLinkedin className="text-2xl text-secondary" />
          </div>
        </div>

        {/* About Column */}
        <div className="w-full lg:w-1/5">
          <p className="text-lg font-semibold mb-4">About</p>
          <ul className="space-y-2">
            <li><a href="#" className="text-secondary hover:underline">About Us</a></li>
            <li><a href="#" className="text-secondary hover:underline">Careers</a></li>
            <li><a href="#" className="text-secondary hover:underline">Our Team</a></li>
            <li><a href="#" className="text-secondary hover:underline">Our Story</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="w-full lg:w-1/5">
          <p className="text-lg font-semibold mb-4">Support</p>
          <ul className="space-y-2">
            <li><a href="#" className="text-secondary hover:underline">Help Center</a></li>
            <li><a href="#" className="text-secondary hover:underline">FAQs</a></li>
            <li><a href="#" className="text-secondary hover:underline">Contact Support</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <p className="text- text-gray-600">
            © 2024 All rights reserved | Created by HarshYadav
          </p>
        </div>
    </div>
  </footer>
);
};
export default Footer;







//Our Experienced instructors will guide you through structured lessons, helping you develop a solid foundation while nurturing your creativity.