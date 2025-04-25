import React from "react";
import "./CategoryCardSection.css";

const categories = [
  {
    name: "Mobiles & Smartphones",
    image:
      "https://images.samsung.com/is/image/samsung/assets/in/smartphones/galaxy-s24-ultra/buy/kv_galaxy-s24-ultra-mo.jpg",
    description:
      "Explore the latest mobiles and smartphones from top brands at unbeatable prices.",
  },
  {
    name: "Audio & Headphones",
    image:
      "https://www.boat-lifestyle.com/cdn/shop/files/141-main-256x256.png",
    description:
      "Experience immersive sound with our range of headphones, earbuds, and speakers.",
  },
  {
    name: "Television & Smart TVs",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/ua55au7700klxl/gallery/in-uhd-au7700-ua55au7700klxl-thumb-533130874",
    description:
      "Upgrade your home with the latest 4K and smart TVs for an outstanding viewing experience.",
  },
  {
    name: "Kitchen Appliances",
    image:
      "https://www.lg.com/in/images/microwave-ovens/md07501484/gallery/MC3286BRUM-D-01.jpg",
    description:
      "Modern kitchen solutions including microwaves, mixers, and more for your convenience.",
  },
  {
    name: "Home Appliances",
    image:
      "https://www.lg.com/in/images/refrigerators/md07501484/gallery/GL-T292RPZN-Refrigerators-Front-View-D-01.jpg",
    description:
      "Discover a wide range of refrigerators, washing machines, and other home essentials.",
  },
];

const CategoryCardSection = ({ onCategoryClick }) => (
  <div className="category-card-section">
    {categories.map((cat, idx) => (
      <div
        className="category-card enhanced-category-card"
        key={cat.name}
        onClick={() => onCategoryClick(cat)}
        tabIndex={0}
        role="button"
        aria-label={`Explore ${cat.name}`}
      >
        <div className="category-card-img-wrap">
          <img src={cat.image} alt={cat.name} className="category-card-img" loading="lazy" onError={(e) => (e.target.style.opacity = 0.3)} />
        </div>
        <div className="category-card-content">
          <h3 className="category-card-title">{cat.name}</h3>
          <p className="category-card-desc">{cat.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default CategoryCardSection;
