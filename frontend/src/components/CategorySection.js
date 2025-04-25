import React from 'react';
import ProductGrid from './ProductGrid';
import './CategorySection.css';

const categories = [
  {
    name: 'Mobiles',
    image: 'https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s24-ultra/buy/kv_galaxy-s24-ultra-mo.jpg',
    products: [1, 2, 3], // Product IDs from ProductGrid.js
  },
  {
    name: 'Audio',
    image: 'https://www.boat-lifestyle.com/cdn/shop/files/141-main-256x256.png',
    products: [4, 5],
  },
  {
    name: 'Television',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/ua55au7700klxl/gallery/in-uhd-au7700-ua55au7700klxl-thumb-533130874',
    products: [6],
  },
];

// This should match the products array from ProductGrid.js
const allProducts = [
  {
    id: 1,
    name: 'Samsung Galaxy S24 Ultra',
    price: '₹1,19,999',
    img: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s928bzkdins/gallery/in-galaxy-s24-ultra-s928-sm-s928bzkdins-thumb-538465033',
  },
  {
    id: 2,
    name: 'Apple iPhone 15 Pro',
    price: '₹1,34,900',
    img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch_GEO_IN?wid=256&hei=256&fmt=jpeg',
  },
  {
    id: 3,
    name: 'OnePlus 12R',
    price: '₹39,999',
    img: 'https://image01.oneplus.net/ebp/202401/17/1-m00-32-9a-cpg7gmw6i9caa1lvaaa8xq7k7gk812_256_256.png',
  },
  {
    id: 4,
    name: 'boAt Airdopes 141',
    price: '₹1,199',
    img: 'https://www.boat-lifestyle.com/cdn/shop/products/141-main-256x256.png',
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5 Headphones',
    price: '₹29,990',
    img: 'https://cdn.sony.co.in/image/7e0c0a3e9c7d8d3b6a9e8c7d8e3b7e0c?fmt=jpeg&wid=256&hei=256',
  },
  {
    id: 6,
    name: 'Samsung 55" 4K Smart TV',
    price: '₹54,990',
    img: 'https://images.samsung.com/is/image/samsung/p6pim/in/ua55au7700klxl/gallery/in-uhd-au7700-ua55au7700klxl-thumb-533130874',
  },
];

const CategorySection = ({ onProductClick }) => (
  <div className="category-section">
    {categories.map((cat, idx) => (
      <section className="category-block enhanced-category-block" key={cat.name}>
        <div className="category-header">
          <img src={cat.image} alt={cat.name + ' banner'} className="category-banner" />
          <h2 className="category-title">{cat.name}</h2>
        </div>
        <ProductGrid
          onProductClick={onProductClick}
          products={allProducts.filter(p => cat.products.includes(p.id))}
        />
      </section>
    ))}
  </div>
);

export default CategorySection;
