import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/domains" className="hover:text-gray-300">Courses</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            <li><a href="/careers" className="hover:text-gray-300">Careers</a></li>
            <li><a href="/about-us" className="hover:text-gray-300">About Us</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">Email: support@orvionar.in</p>
          <p className="mb-2">Phone: +91 7483905485</p>
          <p>Address: Orvionar Tech, BTM Layout,<br />near Lake View Condiments, Bengaluru - 560068</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com/orvionar" aria-label="facebook link" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com/orvionar" aria-label="twitter link" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com/orvionar" aria-label="instagram link" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/orvionar-tech-private-limited/" aria-label="linkedin link" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Orvionar. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/terms" className="hover:text-white">Terms & Conditions</a>
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
