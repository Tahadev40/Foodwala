// src/components/Gallery.jsx
import React from 'react';
import RestaurantMenuApp from '../components/Restaurant.jsx';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';


const RestaurantPage = () => {

  // Add to Cart function
    const addToCart = (item) => {
      const existingCart = JSON.parse(localStorage.getItem('foodwalaCart') || '[]');
      const existingItem = existingCart.find(cartItem => cartItem.id === item.id);
  
      let updatedCart;
      if (existingItem) {
        updatedCart = existingCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...existingCart, { ...item, quantity: 1 }];
      }
  
      localStorage.setItem('foodwalaCart', JSON.stringify(updatedCart));
      
      // Show success feedback
      const button = document.querySelector(`[data-item-id="${item.id}"]`);
      if (button) {
        const originalContent = button.innerHTML;
        button.style.backgroundColor = '#10b981';
        button.innerHTML = '<span>✓ Added to Cart!</span>';
        setTimeout(() => {
          button.style.backgroundColor = '';
          button.innerHTML = originalContent;
        }, 1500);
      }
  
      // Dispatch custom event for cart update
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    };
  
    // Cart icon state
    const [cartCount, setCartCount] = useState(0);
  
    // Update cart count on mount and when cart updates
    useEffect(() => {
      const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('foodwalaCart') || '[]');
        setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
      };
      updateCartCount();
      window.addEventListener('cartUpdated', updateCartCount);
      return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);
  
    // Redirect to cart page
    const goToCart = () => {
      window.location.href = '/cart';
    };
  

  return (
    <section className="w-full bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
       {/* Cart Icon Floating Button */}
            <button
              onClick={goToCart}
              className="fixed z-50 bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg w-16 h-16 flex flex-col items-center justify-center transition-all duration-300"
              style={{ boxShadow: '0 8px 24px rgba(216,75,55,0.18)' }}
              aria-label="View Cart"
            >
              <ShoppingCart className="w-7 h-7 mb-1" />
              <span className="text-xs font-bold">{cartCount}</span>
            </button>
        <RestaurantMenuApp addToCart={addToCart} />
    </section>
  );
};

export default RestaurantPage;