import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, MessageCircle, X } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    setIsVisible(true);
    loadCart();
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('foodwalaCart') || '[]');
    setCart(cartData);
  };

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('foodwalaCart', JSON.stringify(updatedCart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      const updatedCart = cart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      updateCart(updatedCart);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('foodwalaCart');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getDeliveryCharge = () => {
    if (!selectedArea) return 0;
    return selectedArea === 'ghareebabad' ? 60 : 100;
  };

  const getFinalTotal = () => {
    return getTotalAmount() + getDeliveryCharge();
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    if (!selectedArea) {
      alert('Please select your delivery area first!');
      return;
    }

    const orderDetails = cart.map(item => 
      `${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}`
    ).join('%0A');
    
    const subtotal = getTotalAmount();
    const deliveryCharge = getDeliveryCharge();
    const total = getFinalTotal();
    const totalItems = getTotalItems();
    const areaName = selectedArea === 'ghareebabad' ? 'Ghareebabad' : 'Other Area';
    
    const message = `Hi Foodwala! I want to place an order:%0A%0A${orderDetails}%0A%0ASubtotal: Rs. ${subtotal}%0ADelivery (${areaName}): Rs. ${deliveryCharge}%0ATotal Items: ${totalItems}%0ATotal Amount: Rs. ${total}%0A%0ADelivery Area: ${areaName}%0A%0APlease confirm my order. Thank you!`;
    
    window.open(`https://wa.me/923181375067?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm border-b z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Menu</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900">Your Cart</h1>
            <p className="text-xs text-gray-600">
              {cart.length === 0 ? 'Empty cart' : `${getTotalItems()} items`}
            </p>
          </div>
          
          {cart.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`px-4 pb-24 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {cart.length === 0 ? (
          // Empty Cart State - Mobile Optimized
          <div className="text-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cart is empty</h3>
            <p className="text-gray-600 mb-6 text-sm">Add some delicious items!</p>
            <button 
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          // Cart Items - Mobile First Design
          <div className="space-y-3 pt-4">
            {cart.map((item, index) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md p-4 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  {/* Item Image - Smaller for mobile */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900 leading-tight">{item.name}</h3>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          {item.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">Rs. {item.originalPrice}</span>
                          )}
                          <span className="text-sm font-bold text-red-500">Rs. {item.price}</span>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors ml-2 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls & Total */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-6 text-center font-bold text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">Rs. {item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Order Summary Card - Mobile */}
            <div className="bg-white rounded-2xl shadow-md p-4 mt-6 sticky top-20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Delivery Area Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Delivery Area:</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="ghareebabad"
                      checked={selectedArea === 'ghareebabad'}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">Ghareebabad (Rs. 60)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="other"
                      checked={selectedArea === 'other'}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className="text-sm">Other Areas (Rs. 100)</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items ({getTotalItems()})</span>
                  <span>Rs. {getTotalAmount()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={`font-semibold ${selectedArea ? 'text-red-500' : 'text-gray-400'}`}>
                    {selectedArea ? `Rs. ${getDeliveryCharge()}` : 'Select area'}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-red-500">Rs. {getFinalTotal()}</span>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 mb-4">
                <p>⏰ Est. delivery: 20-30 mins</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Order Button - Mobile */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-gray-900">Rs. {getFinalTotal()}</span>
              <p className="text-xs text-gray-600">{getTotalItems()} items {selectedArea && `+ Rs. ${getDeliveryCharge()} delivery`}</p>
            </div>
            {selectedArea && (
              <span className="text-xs text-orange-600 font-semibold">
                {selectedArea === 'ghareebabad' ? 'Ghareebabad' : 'Other Area'}
              </span>
            )}
          </div>
          
          <button
            onClick={handleWhatsAppOrder}
            disabled={!selectedArea}
            className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg active:scale-95 ${
              selectedArea 
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{selectedArea ? 'Order on WhatsApp' : 'Select delivery area'}</span>
          </button>
        </div>
      )}
    </div>
  );
}