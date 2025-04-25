import React from 'react';
import './Header.css';
import MsMobileLogo from '../assets/MsMobileLogo';

const Header = ({ onLoginClick }) => {
  return (
    <header className="header">
      <div className="header__left">
        <MsMobileLogo className="header__logo" width={44} height={44} />
        <span className="header__brand">Ms Mobile</span>
      </div>
      <nav className="header__nav">
        <button className="header__login" onClick={() => onLoginClick('user')}>User Login</button>
        <button className="header__login" onClick={() => onLoginClick('admin')}>Admin Login</button>
      </nav>
    </header>
  );
};

export default Header;
