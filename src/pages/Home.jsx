import React, { useState, useEffect } from 'react';
import { Star, ArrowRight, ShoppingCart, Truck, Globe, Heart, MessageCircle, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const menuItems = [
    {
      id: 1,
      name: 'Zinger Burger',
      price: 350,
      originalPrice: 400,
      description: 'Crispy fried chicken with spicy sauce, lettuce & mayo',
      image: '/public/bugi.webp',
      rating: 4.8,
      reviews: 156,
      isPopular: true,
      cookTime: '12-15 min'
    },
    {
      id: 2,
      name: 'Fries',
      price: 150,
      description: 'Golden crispy fries with our special seasoning',
      image: '/public/fries.jpeg',
      rating: 4.5,
      reviews: 89,
      isPopular: false,
      cookTime: '8-10 min'
    },
    {
      id: 3,
      name: 'Chicken Broast',
      price: 250,
      description: 'crispy chicken broast with fresh sauces and salad',
      image: '/public/broast.webp',
      rating: 4.7,
      reviews: 203,
      isPopular: true,
      cookTime: '15-18 min'
    },
    {
      id: 4,
      name: 'Kabab Roll',
      price: 280,
      description: 'Tender malai boti with creamy sauce in soft paratha',
      image: '/public/kababroll.jpeg',
      rating: 4.9,
      reviews: 178,
      isPopular: true,
      cookTime: '15-18 min'
    }
  ];

  const steps = [
    {
      icon: <Globe size={24} />,
      title: "Visit Our Website",
      description: "Go to foodwala.com and browse our delicious menu"
    },
    {
      icon: <Heart size={24} />,
      title: "Select Your Favorite",
      description: "Choose your favorite burgers, rolls, and fries from our fresh menu"
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Click Order",
      description: "Hit the order button and you'll be redirected to WhatsApp"
    },
    {
      icon: <MapPin size={24} />,
      title: "Share Location",
      description: "Send us your live location on WhatsApp for accurate delivery"
    },
    {
      icon: <Clock size={24} />,
      title: "Get Your Order",
      description: "Sit back and relax! Your fresh food will arrive at your doorstep in just 30 minutes"
    },
    {
      icon: <Heart size={24} />,
      title: "Enjoy Your Meal",
      description: "Savor the delicious flavors of Food Wala, delivered fresh and fast!"
    }
  ];


export default function FoodWalaHero() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

   const navigateToMenu = () => {
    navigate('/menu');
  };


  useEffect(() => {
    setIsVisible(true);
  }, []);
  // Responsive alignment for features section
  const featuresContainerClass =
    "grid grid-cols-2 sm:flex sm:flex-row gap-4 sm:gap-8 py-4 w-full sm:w-auto";
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4 py-12 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[90vh]">
          
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-700 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>Mirpurkhas #1 Fast Food</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 " rel="preload">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Delicious, Fast
                <span className="block text-[#D84B37]">
                  & Fresh Food
                </span>
                <span className="block text-gray-700 text-4xl sm:text-5xl lg:text-6xl">
                  at Your Doorstep
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-xl font-light">
              Order now on WhatsApp & get your food in 30 mins. Fresh ingredients, bold flavors, delivered fast!
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-8 py-4">
              <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-500" />
                </div>
                <span className="font-semibold text-gray-700">30 min delivery</span>
              </div>
              <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-500 fill-current" />
                </div>
                <span className="font-semibold text-gray-700">Fresh ingredients</span>
              </div>
              <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-semibold text-gray-700">Free delivery</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button className="group bg-gradient-to-r from-orange-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3">
                <a
            href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Now
          </a>
                <div className="transform group-hover:translate-x-1 transition-transform">
                  <Truck className="w-6 h-6" />
                </div>
              </button>
              <button className="border-3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                View Menu
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className={`relative transition-all duration-700 delay-200 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <div className="relative">
              {/* Decorative Background Elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-yellow-200 to-red-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -right-6 w-20 h-20 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-50 animate-pulse delay-500"></div>

              {/* Main Image Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-4 sm:p-8 transform hover:rotate-1 transition-all duration-500 hover:shadow-3xl">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center relative">
                  <img
                    src="/new-hero.webp"
                    alt="Delicious Burger"
                        className="w-80 h-80 sm:w-72 sm:h-72 md:w-96 md:h-96 object-cover hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay gradient for better image blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                {/* Floating Price Tag */}
                <div className="absolute -top-4 -right-4 bg-[#D84B37] text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl animate-bounce">
                  Rs. 250
                </div>
              </div>

              {/* Floating Badge Elements */}
              <div className="absolute top-12 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float hover:shadow-2xl transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Fast</p>
                    <p className="text-sm text-gray-600">30 mins</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 -right-8 bg-white rounded-2xl p-4 shadow-xl animate-float delay-700 hover:shadow-2xl transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Rating</p>
                    <p className="text-sm text-gray-600">4.8/5</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
       <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#D84B37]">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Taste our most popular dishes made with fresh ingredients
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
                
                {/* Popular Badge */}
                {item.isPopular && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#D84B37] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Popular</span>
                    </span>
                  </div>
                )}

                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-1">
                    {item.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">Rs. {item.originalPrice}</span>
                    )}
                    <span className="font-bold text-red-500 text-lg">Rs. {item.price}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-500 transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* Rating & Time */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{item.rating}</span>
                    <span>({item.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{item.cookTime}</span>
                  </div>
                </div>

                {/* Order Button */}
                <a 
                    href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
                  target="_blank"
                  rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Order Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View Menu Button */}
        <div className="text-center">
          <button 
            onClick={navigateToMenu}
            className="group border-3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center space-x-3 mx-auto"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#D84B37] leading-tight">
              About Food Wala
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Food Wala is a home-grown fast food brand based in Mirpurkhas, offering high-quality burgers, 
              rolls & fries with fast delivery. We care about freshness & punctuality.
            </p>
            
            <div className="pt-4">
              <a
                href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg w-2/3 sm:w-1/2">
                <MessageCircle size={20} />
                Order on WhatsApp
              </a>
            </div>
          </div>
          
          {/* Map Image */}
          <div className="relative">
            <div className="rounded-2xl h-80 sm:h-96 overflow-hidden shadow-lg">
              <img 
                src="/map.webp" 
                alt="Food Wala Location Map - Karachi, Pakistan"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
         <section className="w-full bg-white py-12 sm:py-16 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D84B37] mb-3 sm:mb-4">
            How to Order
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Ordering from Food Wala is super easy! Just follow these simple steps to get your 
            favorite fresh food delivered right to your doorstep in no time.
          </p>
        </div>

        {/* Steps */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {steps.map((step, index) => (
              <div key={index} className="w-full text-center group">
                {/* Icon */}
                <div className="bg-red-100 text-[#D84B37] w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-lg">
                  {step.icon}
                </div>
                
                {/* Step Number */}
                <div className="text-[#D84B37] font-bold text-xs sm:text-sm mb-2">
                  STEP {index + 1}
                </div>
                
                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg px-2">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full">
          <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 text-center">
              Ready to Order?
            </h3>
            <p className="text-gray-600 mb-6 text-center text-sm sm:text-base leading-relaxed">
              Start your food journey with Food Wala today and experience the fastest 
              delivery in town with the freshest ingredients!
            </p>
            <div className="text-center">
              <a
              href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg text-sm sm:text-base">
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}