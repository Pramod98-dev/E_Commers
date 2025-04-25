import React from "react";
import "./CategoryCardSection.css";

const categories = [
  {
    name: "Mobiles & Smartphones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    description:
      "Explore the latest mobiles and smartphones from top brands at unbeatable prices.",
  },
  {
    name: "Audio & Headphones",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    description:
      "Experience immersive sound with our range of headphones, earbuds, and speakers.",
  },
  {
    name: "Television & Smart TVs",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    description:
      "Upgrade your home with the latest 4K and smart TVs for an outstanding viewing experience.",
  },
  {
    name: "Kitchen Appliances",
    image:
      "https://images.unsplash.com/photo-1506368083636-6defb67639f0?auto=format&fit=crop&w=400&q=80",
    description:
      "Modern kitchen solutions including microwaves, mixers, and more for your convenience.",
  },
  {
    name: "Home Appliances",
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
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
