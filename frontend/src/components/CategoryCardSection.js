import React, { useEffect, useRef, useState } from "react";
import "./CategoryCardSection.css";

const sliderImages = [
  {
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern Electronics Store Interior with Gadgets",
  },
  {
    url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
    alt: "HD Display of Laptops and Mobiles in Store",
  },
  {
    url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    alt: "Showcase of Smart TVs and Audio Devices",
  },
  {
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    alt: "Bright Electronics Store with Cameras and Gadgets",
  },
];

const SLIDE_INTERVAL = 3500;

const storeInfo = [
  {
    title: "About Our Store",
    description: "Ms Mobile is your one-stop shop for the latest mobiles, laptops, smart TVs, cameras, and all things electronics. We are committed to providing genuine products, competitive prices, and excellent customer service.",
  },
  {
    title: "Why Shop With Us?",
    description: "Enjoy fast shipping, secure payments, and exclusive deals from top brands. Our expert team is always ready to help you make the best choice for your needs.",
  },
  {
    title: "Customer Satisfaction",
    description: "We value every customer and strive for 100% satisfaction. Read real reviews, get expert advice, and experience hassle-free returns.",
  },
  {
    title: "Visit Us In-Store or Online",
    description: "Shop from the comfort of your home or visit our modern retail locations to experience the latest tech hands-on!",
  },
];

const CategoryCardSection = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, SLIDE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div>
      <div className="main-slider-outer">
        <div className="main-slider-container">
          {sliderImages.map((img, idx) => (
            <img
              key={img.url}
              src={img.url}
              alt={img.alt}
              className={`main-slider-img${idx === current ? " active" : ""}`}
              style={{ display: idx === current ? "block" : "none" }}
            />
          ))}
          <div className="main-slider-dots">
            {sliderImages.map((_, idx) => (
              <span
                key={idx}
                className={idx === current ? "dot active" : "dot"}
                onClick={() => setCurrent(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <section className="store-info-section">
        <h2 className="store-info-heading">Welcome to Ms Mobile Electronics</h2>
        <div className="store-info-cards">
          {storeInfo.map((info, idx) => (
            <div className="store-info-card" key={idx}>
              <h3>{info.title}</h3>
              <p>{info.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryCardSection;