import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Cart', href: '/cart' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/">
              <img
                preload="true"
                src="/foodwala-logo.webp"
                alt="FoodWala Logo"
                className="h-16 w-auto sm:h-16 object-contain cursor-pointer"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 flex md:hidden"></div>
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group px-4 py-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-all duration-200 font-medium text-sm lg:text-base"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Order Now Button & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Order Now Button */}
            <a
              href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-orange-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
              <span className="hidden sm:inline">Order Now</span>
              <span className="sm:hidden">Order</span>
            </a>

            {/* Mobile Menu Button (fixed, no WhatsApp link) */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? 'max-h-96 opacity-100 pb-4'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="pt-2 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-gray-700 hover:text-red-500 hover:bg-red-50 transition-all duration-200 font-medium text-base transform ${
                  isMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Order Button */}
            <div className="px-4 pt-2">
              <a
                href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="w-full group bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                <span>Order Now via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-100 bg-opacity-30 backdrop-blur-sm z-[-1]"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
