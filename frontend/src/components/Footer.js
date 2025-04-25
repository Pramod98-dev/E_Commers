import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer__container">
      <div className="footer__about">
        <h3>About Ms Mobile</h3>
        <p>Ms Mobile is your one-stop shop for the latest mobiles and accessories. We offer a wide range of products, competitive prices, and top-notch customer service.</p>
      </div>
      <div className="footer__contact">
        <h3>Contact Us</h3>
        <p>Email: support@msmobile.com<br/>Phone: +91-12345-67890</p>
      </div>
    </div>
    <div className="footer__copyright">
      &copy; {new Date().getFullYear()} Ms Mobile. All rights reserved.
    </div>
  </footer>
);

export default Footer;
