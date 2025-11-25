import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, MessageCircle, X } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const DELIVERY_FEE = 100;
  const deliverySelected = true; // 🔥 Always ON

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

  const getFinalTotal = () => {
    return getTotalAmount() + DELIVERY_FEE;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    const orderDetails = cart
      .map(item => `${item.name} x${item.quantity} = Rs. ${item.price * item.quantity}`)
      .join("\n");

    const subtotal = getTotalAmount();
    const total = getFinalTotal();

    fetch("https://hook.us2.make.com/4w1b2ixpqg2vdcc324w236htrb5xnfx9", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        subtotal,
        deliveryCharge: DELIVERY_FEE,
        total,
        totalItems: getTotalItems(),
        area: "Delivery - Fixed Fee",
        createdAt: new Date().toISOString()
      })
    });

    const message = `Hi Foodwala! I want to place an order:\n\n${orderDetails}\n\nSubtotal: Rs. ${subtotal}\nDelivery Fee: Rs. ${DELIVERY_FEE}\nTotal Items: ${getTotalItems()}\nTotal Amount: Rs. ${total}\n\nDelivery: Yes\n\nPlease confirm my order.`;

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
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md p-4">
                <div className="flex items-start space-x-3">

                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-bold">{item.name}</h3>
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

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-md p-4 mt-6">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items ({getTotalItems()})</span>
                  <span>Rs. {getTotalAmount()}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-red-500">Rs. {DELIVERY_FEE}</span>
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
              <p className="text-xs text-gray-600">{getTotalItems()} items + Rs. 100 delivery</p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 bg-green-600 text-white"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Order on WhatsApp</span>
          </button>

        </div>
      )}
    </div>
  );
}
