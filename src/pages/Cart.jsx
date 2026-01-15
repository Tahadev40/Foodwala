import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, MessageCircle, X, MapPin } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');

  // 8 Different Areas with Different Delivery Charges
  const AREAS = [
    { id: 'herebad', name: 'Herebad', charge: 150 },
    { id: 'ghareebabad', name: 'Ghareebabad', charge: 150 },
    { id: 'gulberg', name: 'Gulberg', charge: 150 },
    { id: 'chandnichowck', name: 'Chandni Chowck', charge: 170 },
    { id: 'pakcolony', name: 'Pak Colony', charge: 150 },
    { id: 'satelliteTown', name: 'Satellite Town', charge: 200 },
    { id: 'karimabad', name: 'Karimabad', charge: 150 },
    { id: 'noorshahcolony', name: 'Noor Shah Colony', charge: 150 },
    { id: 'kfc', name: 'Kfc', charge: 200 },
    { id: 'khiprostand', name: 'Khipro Stand', charge: 150 }
  ];

  useEffect(() => {
    setIsVisible(true);
    loadCart();

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

  const getDeliveryCharge = () => {
    const area = AREAS.find(a => a.id === selectedArea);
    return area ? area.charge : 0;
  };

  const getFinalTotal = () => {
    return getTotalAmount() + getDeliveryCharge();
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSelectedAreaName = () => {
    const area = AREAS.find(a => a.id === selectedArea);
    return area ? area.name : '';
  };

  // Group items by restaurant
  const getGroupedCart = () => {
    const grouped = {};
    cart.forEach(item => {
      const restaurantName = item.restaurantName || 'Unknown Restaurant';
      if (!grouped[restaurantName]) {
        grouped[restaurantName] = [];
      }
      grouped[restaurantName].push(item);
    });
    return grouped;
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!selectedArea) {
      alert('Please select your delivery area first!');
      return;
    }

    // Group items by restaurant for WhatsApp message
    const groupedCart = getGroupedCart();
    
    let orderDetails = '';
    Object.keys(groupedCart).forEach(restaurantName => {
      orderDetails += `🍽 *${restaurantName}*\n`;
      groupedCart[restaurantName].forEach(item => {
        const itemName = item.displayName || item.name;
        orderDetails += `  • ${itemName} x${item.quantity} = Rs. ${item.price * item.quantity}\n`;
      });
      orderDetails += '\n';
    });

    const subtotal = getTotalAmount();
    const deliveryCharge = getDeliveryCharge();
    const total = getFinalTotal();
    const areaName = getSelectedAreaName();

    fetch("https://hook.us2.make.com/4w1b2ixpqg2vdcc324w236htrb5xnfx9", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        subtotal,
        deliveryCharge,
        total,
        totalItems: getTotalItems(),
        area: areaName,
        createdAt: new Date().toISOString(),
        groupedByRestaurant: groupedCart
      })
    });

    const message = `Hi Foodwala! I want to place an order:\n\n${orderDetails}Subtotal: Rs. ${subtotal}\nDelivery Area: ${areaName}\nDelivery Fee: Rs. ${deliveryCharge}\nTotal Items: ${getTotalItems()}\nTotal Amount: Rs. ${total}\n\nPlease confirm my order.`;

    window.open(`https://wa.me/923181375067?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm border-b z-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-500"
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
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main */}
      <div className={`px-4 pb-24 transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>

        {cart.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cart is empty</h3>
            <button 
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-4">
            
            {/* Delivery Area Selection */}
            <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-bold text-gray-900">Select Your Nearest Delivery Area</h3>
                {!selectedArea && (
                  <span className="text-red-500 text-xs">*Required</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {AREAS.map(area => (
                  <label
                    key={area.id}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedArea === area.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="area"
                        value={area.id}
                        checked={selectedArea === area.id}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{area.name}</div>
                        <div className="text-xs text-orange-600 font-bold">Rs. {area.charge}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {selectedArea && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ Delivering to <span className="font-bold">{getSelectedAreaName()}</span> - Delivery Fee: Rs. {getDeliveryCharge()}
                  </p>
                </div>
              )}
            </div>

            {/* Group items by restaurant in cart display */}
            {Object.entries(getGroupedCart()).map(([restaurantName, items]) => (
              <div key={restaurantName}>
                {/* Restaurant Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl px-4 py-3 mt-4">
                  <h3 className="font-bold text-sm flex items-center">
                    <span className="mr-2">🍽</span>
                    {restaurantName}
                  </h3>
                </div>

                {/* Items from this restaurant */}
                <div className="bg-white rounded-b-2xl shadow-md">
                  {items.map((item, index) => (
                    <div key={item.id} className={`p-4 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-start space-x-3">

                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                              <ShoppingCart className="w-8 h-8 text-orange-500" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-base font-bold">{item.displayName || item.name}</h3>
                              {item.selectedSize && (
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
                                  {item.selectedSize}
                                </span>
                              )}
                              <div className="flex items-center space-x-2 mt-2">
                                {item.originalPrice && (
                                  <span className="text-xs text-gray-500 line-through">Rs. {item.originalPrice}</span>
                                )}
                                <span className="text-sm font-bold text-red-500">Rs. {item.price}</span>
                              </div>
                            </div>

                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex justify-between mt-3">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>

                              <span className="w-6 text-center font-bold">{item.quantity}</span>

                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-right font-bold text-gray-900">
                              Rs. {item.price * item.quantity}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-md p-4 mt-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items ({getTotalItems()})</span>
                  <span>Rs. {getTotalAmount()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  {selectedArea ? (
                    <span className="font-semibold text-orange-600">Rs. {getDeliveryCharge()}</span>
                  ) : (
                    <span className="text-gray-400 text-xs">Select area</span>
                  )}
                </div>

                <hr />

                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-red-500">Rs. {getFinalTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Order Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-gray-900">Rs. {getFinalTotal()}</span>
              <p className="text-xs text-gray-600">
                {getTotalItems()} items
                {selectedArea && ` + Rs. ${getDeliveryCharge()} delivery (${getSelectedAreaName()})`}
              </p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
              selectedArea 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{selectedArea ? 'Order on WhatsApp' : 'Select Area First'}</span>
          </button>

        </div>
      )}
    </div>
  );
}