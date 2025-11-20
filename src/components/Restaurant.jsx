import React, { useState, useEffect } from 'react';
import { Star, Clock, ShoppingCart, ChevronLeft, MapPin, ArrowRight, Plus } from 'lucide-react';

// ============================================
// CONTENTFUL CONFIG - YAHA CREDENTIALS DAALO
// ============================================
const CONTENTFUL_CONFIG = {
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
};


// API Helper Functions
const getRestaurantsURL = () => 
   `https://cdn.contentful.com/spaces/${CONTENTFUL_CONFIG.space}/entries?access_token=${CONTENTFUL_CONFIG.accessToken}&content_type=restaurant&order=-fields.featured,fields.name`;

const getRestaurantMenuLinksURL = (restaurantId) => 
  `https://cdn.contentful.com/spaces/${CONTENTFUL_CONFIG.space}/entries?access_token=${CONTENTFUL_CONFIG.accessToken}&content_type=restaurantMenuItem&fields.restaurant.sys.id=${restaurantId}&include=2`;

// ============================================
// RESTAURANT LIST COMPONENT
// ============================================
const RestaurantList = ({ onRestaurantClick }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(getRestaurantsURL());
      const data = await response.json();
      
      const assets = data.includes?.Asset || [];
      
      const transformedRestaurants = data.items.map(item => {
        const logoAsset = assets.find(
          asset => asset.sys.id === item.fields.logo?.sys.id
        );
        
        return {
          id: item.sys.id,
          name: item.fields.name,
          logo: logoAsset?.fields?.file?.url || '',
          rating: item.fields.rating || 4.5,
          reviews: item.fields.reviews || 0,
          deliveryTime: item.fields.deliveryTime || '30-40 min',
          minOrder: item.fields.minOrder || 150,
          location: item.fields.location || 'Karachi',
          phone: item.fields.phone || '923181375067',
          cuisine: item.fields.cuisine || [],
          isPopular: item.fields.isPopular || false
        };
      });

      setRestaurants(transformedRestaurants);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([
        {
          id: 'demo1',
          name: "Dino's Chicken",
          logo: '',
          rating: 4.8,
          reviews: 450,
          deliveryTime: '25-35 min',
          minOrder: 200,
          location: 'Gulshan-e-Iqbal',
          phone: '923181375067',
          cuisine: ['Fast Food', 'BBQ', 'Chicken'],
          isPopular: true
        },
        {
          id: 'demo2',
          name: "Miskeen Restaurant",
          logo: '',
          rating: 4.6,
          reviews: 320,
          deliveryTime: '30-40 min',
          minOrder: 250,
          location: 'Bahadurabad',
          phone: '923181375067',
          cuisine: ['Desi', 'BBQ', 'Karahi'],
          isPopular: true
        }
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-2xl text-gray-600">Loading restaurants...</div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-5xl font-bold text-gray-900 mb-4">
            Popular <span className="text-orange-500">Restaurants</span> In Mirpurkhas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our featured restaurants and explore their delicious menu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => onRestaurantClick(restaurant)}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden border border-gray-100 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
                {restaurant.logo ? (
                  <img
                    src={restaurant.logo.startsWith('//') ? `https:${restaurant.logo}` : restaurant.logo}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="text-6xl font-bold text-orange-500">
                      {restaurant.name.charAt(0)}
                    </div>
                  </div>
                )}
                
                {restaurant.isPopular && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Popular</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {restaurant.name}
                </h3>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.cuisine.map((item, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{restaurant.rating}</span>
                    <span>({restaurant.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{restaurant.location}</span>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Min Order: Rs. {restaurant.minOrder}
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <span>View Menu</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// MENU ITEM COMPONENT (WITH SIZE SELECTOR)
// ============================================
const MenuItem = ({ item }) => {
  const [selectedSize, setSelectedSize] = useState('small');
  
  // Check if item has sizes
  const hasSizes = !!(item.smallPrice || item.mediumPrice || item.largePrice);
  
  // Size configuration
  const sizes = hasSizes ? {
    small: { 
      price: item.smallPrice, 
      label: 'Small',
      subtitle: '8"'
    },
    medium: { 
      price: item.mediumPrice, 
      label: 'Medium',
      subtitle: '12"'
    },
    large: { 
      price: item.largePrice, 
      label: 'Large',
      subtitle: '16"'
    }
  } : null;

  // Current price based on selected size
  const currentPrice = hasSizes && sizes 
    ? (sizes[selectedSize]?.price || item.price)
    : item.price;

  const addToCart = () => {
    const cartItem = {
      ...item,
      price: currentPrice,
      id: hasSizes ? `${item.id}-${selectedSize}` : item.id,
      selectedSize: hasSizes ? selectedSize : null,
      displayName: hasSizes && sizes
        ? `${item.name} (${sizes[selectedSize]?.label || 'Small'})`
        : item.name
    };

    const existingCart = JSON.parse(localStorage.getItem('foodwalaCart') || '[]');
    const existingItemIndex = existingCart.findIndex(
      ci => ci.id === cartItem.id
    );

    let updatedCart;
    if (existingItemIndex > -1) {
      updatedCart = existingCart.map((ci, idx) =>
        idx === existingItemIndex
          ? { ...ci, quantity: ci.quantity + 1 }
          : ci
      );
    } else {
      updatedCart = [...existingCart, { ...cartItem, quantity: 1 }];
    }

    localStorage.setItem('foodwalaCart', JSON.stringify(updatedCart));
    
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

    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden border border-gray-100">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-red-100">
        {item.image ? (
          <img
            src={item.image.startsWith('//') ? `https:${item.image}` : item.image}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingCart className="w-16 h-16" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.isPopular && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Star className="w-3 h-3 fill-current" />
              <span>Popular</span>
            </span>
          )}
          {item.isSpicy && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              🌶️ Spicy
            </span>
          )}
          {item.isVegetarian && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              🥗 Veg
            </span>
          )}
          {item.originalPrice && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Sale
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-2 shadow-lg">
          <div className="flex items-center space-x-1">
            {item.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                Rs. {item.originalPrice}
              </span>
            )}
            <span className="font-bold text-red-500 text-lg">
              Rs. {currentPrice}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-500 transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Size Selector (Only for items with size variations) */}
        {hasSizes && sizes && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 font-semibold">Select Size:</p>
            <div className="flex gap-2">
              {Object.entries(sizes).map(([key, value]) => (
                value.price ? (
                  <button
                    key={key}
                    onClick={() => setSelectedSize(key)}
                    className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                      selectedSize === key
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-bold">{value.label}</div>
                    <div className="text-xs opacity-75">{value.subtitle}</div>
                    <div className="text-xs font-semibold mt-1">Rs. {value.price}</div>
                  </button>
                ) : null
              ))}
            </div>
          </div>
        )}

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

        <button
          data-item-id={item.id}
          onClick={addToCart}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Add to Cart</span>
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ============================================
// RESTAURANT MENU COMPONENT
// ============================================
const RestaurantMenu = ({ restaurant, onBack }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (restaurant) {
      fetchMenuItems(restaurant.id);
    }
  }, [restaurant]);

  const fetchMenuItems = async (restaurantId) => {
    try {
      setLoading(true);
      const response = await fetch(getRestaurantMenuLinksURL(restaurantId));
      const data = await response.json();
      
      const assets = data.includes?.Asset || [];
      const masterItems = data.includes?.Entry || [];
      
      const transformedMenu = data.items.map(link => {
        const masterItem = masterItems.find(
          item => item.sys.id === link.fields.masterItem?.sys?.id
        );
        
        const imageAsset = assets.find(
          asset => asset.sys.id === masterItem?.fields?.image?.sys?.id
        );
        
        const smallPrice = masterItem?.fields?.smallPrice;
        const mediumPrice = masterItem?.fields?.mediumPrice;
        const largePrice = masterItem?.fields?.largePrice;
        const hasSizes = !!(smallPrice || mediumPrice || largePrice);
        
        return {
          id: link.sys.id,
          name: masterItem?.fields?.name || 'Unknown Item',
          description: link.fields.customDescription || masterItem?.fields?.description || '',
          price: hasSizes ? smallPrice : (link.fields.price || 0),
          originalPrice: link.fields.originalPrice || null,
          image: imageAsset?.fields?.file?.url || '',
          rating: masterItem?.fields?.rating || 4.5,
          reviews: masterItem?.fields?.reviews || 0,
          isSpicy: masterItem?.fields?.isSpicy || false,
          isVegetarian: masterItem?.fields?.isVegetarian || false,
          isPopular: link.fields.isPopular || false,
          isAvailable: link.fields.isAvailable !== false,
          cookTime: masterItem?.fields?.cookTime || '15-20 min',
          category: masterItem?.fields?.category || 'others',
          restaurantName: restaurant.name,
          restaurantId: restaurant.id,
          smallPrice: smallPrice,
          mediumPrice: mediumPrice,
          largePrice: largePrice
        };
      }).filter(item => item.isAvailable);

      setMenuItems(transformedMenu);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setMenuItems([]);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-600">Loading menu...</div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Restaurants</span>
          </button>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {restaurant?.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{restaurant?.rating}</span>
                <span>({restaurant?.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>{restaurant?.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{restaurant?.location}</span>
              </div>
            </div>
            {restaurant?.cuisine && restaurant.cuisine.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {restaurant.cuisine.map((item, idx) => (
                  <span key={idx} className="text-sm bg-white text-gray-700 px-3 py-1 rounded-full border border-orange-200">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {menuItems.length === 0 ? (
          <div className="text-center py-12 bg-orange-50 rounded-2xl">
            <p className="text-xl text-gray-600 mb-2">No menu items found for this restaurant.</p>
            <p className="text-gray-500 mb-4">Please add menu items using Restaurant Menu Links in Contentful</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        )}
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
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const RestaurantMenuApp = () => {
  const [view, setView] = useState('list');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('menu');
  };

  const handleBackClick = () => {
    setView('list');
    setSelectedRestaurant(null);
  };

  return (
    <div className="min-h-screen">
      {view === 'list' ? (
        <RestaurantList onRestaurantClick={handleRestaurantClick} />
      ) : (
        <RestaurantMenu 
          restaurant={selectedRestaurant} 
          onBack={handleBackClick} 
        />
      )}
    </div>
  );
};

export default RestaurantMenuApp;