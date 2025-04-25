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
  {
    name: "Laptops & Computers",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    description:
      "Shop the latest laptops, desktops, and computer accessories for work and play.",
  },
  {
    name: "Wearables & Smartwatches",
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80",
    description:
      "Track your fitness and stay connected with stylish wearables and smartwatches.",
  },
  {
    name: "Gaming Consoles",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
    description:
      "Discover the latest gaming consoles and accessories for immersive entertainment.",
  },
  {
    name: "Cameras & Photography",
    image:
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=400&q=80",
    description:
      "Capture memories with top-rated cameras, lenses, and photography gear.",
  },
];

const relatedInfo = [
  {
    title: "Why Shop Electronics With Us?",
    description:
      "We offer genuine products, fast shipping, and unbeatable customer support. Our curated selection ensures you get the latest and most reliable electronic appliances at the best prices.",
  },
  {
    title: "Secure Shopping",
    description:
      "Your data and transactions are protected with industry-leading security. Shop with confidence on our trusted platform.",
  },
  {
    title: "Top Brands",
    description:
      "We partner with top brands to bring you the best deals and exclusive launches in the electronics market.",
  },
  {
    title: "Customer Reviews",
    description:
      "Read real reviews from verified buyers to make informed decisions for your next purchase.",
  },
];

const CategoryCardSection = ({ onCategoryClick }) => (
  <>
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
    <section className="related-info-section">
      <h2 className="related-info-heading">More About Shopping Electronics</h2>
      <div className="related-info-cards">
        {relatedInfo.map((info, idx) => (
          <div className="related-info-card" key={idx}>
            <h3>{info.title}</h3>
            <p>{info.description}</p>
          </div>
        ))}
      </div>
    </section>
  </>
);

export default CategoryCardSection;
