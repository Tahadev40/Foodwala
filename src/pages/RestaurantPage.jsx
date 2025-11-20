// src/components/Gallery.jsx
import { useEffect, useState } from 'react';
import client from '../contentful.js';
import RestaurantMenuApp from '../components/Restaurant.jsx';

const RestaurantPage = () => {

  return (
    <section className="w-full bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <RestaurantMenuApp />
    </section>
  );
};

export default RestaurantPage;