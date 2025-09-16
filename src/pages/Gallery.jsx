// src/components/Gallery.jsx
import { useEffect, useState } from 'react';
import client from '../contentful.js';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    client.getEntries({ content_type: 'galleryImage' })
      .then((response) => {
        console.log("Contentful Data:", response.items);
        // Filter out entries without valid images
        const validImages = response.items.filter(item => 
          item.fields?.image?.fields?.file?.url
        );
        setImages(validImages);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="w-full bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a look at our delicious food creations and happy customers
          </p>
          <div className="w-24 h-1 bg-red-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {images.map((item, index) => (
            <div 
              key={item.sys.id} 
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={item.fields.image.fields.file.url}
                  alt={item.fields?.title || 'Gallery Image'}
                  className="w-full h-56 sm:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                
                {/* Overlay - Only shows on hover */}
                {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <div className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      View Image
                    </div>
                  </div>
                </div> */}

                {/* Image Number Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  #{index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-red-500 transition-colors duration-300">
                  {item.fields?.title || 'Delicious Food'}
                </h3>
                
                {/* Decorative element */}
                <div className="flex justify-center mt-3">
                  <div className="w-8 h-0.5 bg-gray-200 group-hover:bg-red-500 transition-colors duration-300 rounded-full"></div>
                </div>
              </div>

              {/* Border accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {images.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
            <p className="text-gray-600">Loading gallery images...</p>
          </div>
        )}

        {/* Bottom CTA */}
        {images.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hungry for More?
              </h3>
              <p className="text-gray-600 mb-6">
                See something you like? Order now and taste the Food Wala difference!
              </p>
              <a
              href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg transform hover:scale-105">
                Order Now
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;