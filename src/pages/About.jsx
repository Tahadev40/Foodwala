import React from 'react';
import { Clock, Heart, Users, Award, MapPin, Truck } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "30", label: "Minutes Delivery", icon: <Clock size={24} /> },
    { number: "1000+", label: "Happy Customers", icon: <Users size={24} /> },
    { number: "50+", label: "Menu Items", icon: <Heart size={24} /> },
    { number: "5★", label: "Average Rating", icon: <Award size={24} /> }
  ];

  const values = [
    {
      icon: <Heart size={32} />,
      title: "Made with Love",
      description: "Every dish is prepared with care and passion, using the finest ingredients to ensure exceptional taste."
    },
    {
      icon: <Clock size={32} />,
      title: "Fast Delivery",
      description: "We guarantee delivery within 30 minutes, bringing hot and fresh food right to your doorstep."
    },
    {
      icon: <Users size={32} />,
      title: "Community First",
      description: "We partner with local chefs and vendors, supporting local businesses and creating more opportunities."
    },
    {
      icon: <Award size={32} />,
      title: "Quality Assured",
      description: "We maintain the highest standards of food quality and hygiene to ensure your satisfaction."
    }
  ];

  return (
    <div className="min-h-screen bg-white mt-16">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-red-500">Foodwala</span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-gray-700 font-medium mb-8 leading-relaxed">
            Redefining Local Food Delivery – Fast, Fresh & Flavorful
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Welcome to <strong className="text-red-600">Foodwala</strong>, your neighborhood food delivery service with a big mission: to bring your favorite meals to your doorstep with speed, care, and unbeatable taste. We're not just another delivery app. We're a growing community built around food, quality, and convenience. Whether it's a juicy burger, spicy tikka, or crispy zinger roll, we ensure every bite feels homemade and satisfying. Our commitment goes beyond just delivering food we're passionate about creating memorable dining experiences that bring families together and satisfy those late-night cravings. From traditional Pakistani dishes to international favorites, we've curated a menu that speaks to every palate and every mood.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
             At Foodwala, we partner with the best local chefs and vendors to support local businesses while giving you more delicious choices every day. We believe in the power of community and understand that behind every great meal is a passionate chef who puts their heart into their craft. Our rigorous selection process ensures that only the finest restaurants and food vendors join our platform, maintaining the highest standards of quality, hygiene, and taste. We work closely with our partners to understand their specialties, helping them reach more customers while preserving the authenticity and soul of their recipes. This collaboration creates a win-win environment where local businesses thrive and customers discover hidden culinary gems in their neighborhoods.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
             Fast deliveries, fair prices, and food made with love – that's the Foodwala way. Our dedicated delivery team works around the clock to ensure your hot meals reach you within minutes, not hours. We've invested in state-of-the-art logistics and tracking systems that keep you informed every step of the way, from kitchen to your doorstep. Our transparent pricing means no hidden charges or surprise fees – just honest, affordable rates that respect your budget. But what truly sets us apart is our commitment to quality control. Every order is carefully prepared, packaged with care, and delivered by trained professionals who understand that they're not just carrying food, they're carrying someone's satisfaction and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#D84B37] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-red-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Foodwala?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to delivering more than just food — we deliver experiences that matter.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="bg-red-100 text-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D84B37] group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500 text-white p-4 rounded-full">
              <MapPin size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Proudly Serving Mirpurkhas</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Based in the heart of Mirpurkhas, we're a home-grown brand that understands local tastes and preferences. 
            Our mission is to serve our community with the best food delivery experience possible.
          </p>
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <Truck className="text-red-500" size={24} />
                <span className="text-gray-900 font-medium">Fast and Safe Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Experience the Foodwala Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who trust us for their daily meals.
          </p>
          <a
            href="https://wa.me/923181375067?text=Hi%20Foodwala%20Team%2C%20I%20want%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#D84B37] hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg text-lg"
          >
            Order Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;