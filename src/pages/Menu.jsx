import React, { useState, useEffect } from 'react';
import { Star, Clock, Flame, Heart, ShoppingCart, Plus, Filter, Search } from 'lucide-react';

// Contentful API call
const fetchMenuData = async () => {
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const res = await fetch(
  `https://cdn.contentful.com/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}&content_type=foodwalaMenu&include=1`
);

  const data = await res.json();

  // Map data to UI format
  return data.items.map((item) => {
    const imageId = item.fields.image?.sys?.id;
    const imageUrl = data.includes.Asset.find((asset) => asset.sys.id === imageId)?.fields.file.url;

    return {
      id: item.sys.id,
      name: item.fields.name || '',
      price: item.fields.price || 0,
      originalPrice: item.fields.originalPrice || null,
      category: item.fields.category || 'others',
      description: item.fields.description || '',
      image: imageUrl ? `https:${imageUrl}` : '',
      rating: item.fields.rating || 0,
      isPopular: item.fields.isPopular || false,
      isSpicy: item.fields.isSpicy || false,
      cookTime: item.fields.cookTime || '',
    };
  });
};

export default function FoodWalaMenuSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'Burgers', name: 'Burgers' },
    { id: 'Rolls', name: 'Rolls' },
    { id: 'Deals', name: 'Deals' },
    { id: 'Drinks', name: 'Drinks' },
    { id: 'Extras', name: 'Extras' }
  ];

  useEffect(() => {
    setIsVisible(true);

    fetchMenuData().then((data) => {
      setMenuItems(data);
      setLoading(false);
    });
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

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

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-10 to-red-10 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>Fresh & Delicious</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Foodwala <span className="text-[#D84B37]">Menu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our mouth-watering selection of burgers, rolls, and more. Made fresh daily with premium ingredients.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className={`mb-8 transition-all duration-1000 delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search delicious food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors text-gray-700 font-medium"
              />
            </div>
            
            {/* Filter Button */}
            <button className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full border-2 border-gray-200 hover:border-red-500 transition-colors font-medium text-gray-700 hover:text-red-500">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500 shadow-sm'
                }`}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center py-20">Loading menu...</div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-800 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-103 hover:-translate-y-2 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading='lazy'
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.isPopular && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                        <Flame className="w-3 h-3" />
                        <span>Popular</span>
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🌶️ Spicy
                      </span>
                    )}
                    {item.originalPrice && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Sale
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                      favorites.includes(item.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1 shadow-lg">
                    <div className="flex items-center space-x-1">
                      {item.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">Rs. {item.originalPrice}</span>
                      )}
                      <span className="font-bold text-red-500">Rs. {item.price}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-500 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{item.rating}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{item.cookTime}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Available</span>
                    </div>
                  </div>
                  <button
                    data-item-id={item.id}
                    onClick={() => addToCart(item)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Add to Cart</span>
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View Full Menu
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
  );
}