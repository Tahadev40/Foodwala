import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="text-center md:text-left">
            {/* Logo */}
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img 
                src="/foodwala-logo.webp" 
                alt="Food Wala Logo" 
                className="w-20 h-20 object-contain mr-3"
              />
            </div>
            
            <p className="text-gray-300 mb-6 max-w-sm mx-auto md:mx-0">
              Delicious, fast & fresh food at your doorstep. Quality you can trust.
            </p>
            
            {/* Social Media */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/taha.khan.608321" className="bg-gray-800 hover:bg-red-500 p-2 rounded-full transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/itaha.noo/" className="bg-gray-800 hover:bg-red-500 p-2 rounded-full transition-colors duration-300">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-red-500 transition-colors duration-300">Home</a></li>
              <li><a href="/menu" className="text-gray-300 hover:text-red-500 transition-colors duration-300">Menu</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-red-500 transition-colors duration-300">About</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-red-500 transition-colors duration-300">Gallery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <MapPin size={16} className="text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Mirpurkhas, Pakistan</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <Phone size={16} className="text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">0318-1375067</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">tahapathan000@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Food Wala. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;