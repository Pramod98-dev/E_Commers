import React from 'react';
import './Header.css';
import MsMobileLogo from '../assets/MsMobileLogo';

const Header = ({ onLoginClick, user, admin, onLogout, isAdmin, section, setSection, sidebarCollapsed }) => {
  // Remove background and color from inline style so CSS takes over, but keep marginLeft for sidebar
  const headerStyle = isAdmin
    ? {
        marginLeft: sidebarCollapsed ? 60 : 220,
        transition: 'margin-left 0.2s',
        width: '100%',
      }
    : {};
  const navItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" }
  ];
  return (
    <header className="header" style={headerStyle}>
      <div className="header__left">
        <MsMobileLogo className="header__logo" width={44} height={44} />
      </div>
      {isAdmin && (
        <nav className="header__nav" style={{marginLeft: 32}}>
          {navItems.map(item => (
            <button
              key={item.key}
              className={section === item.key ? "header-nav-btn active" : "header-nav-btn"}
              onClick={() => setSection(item.key)}
            >
              {item.label}
            </button>
          ))}
          <div className="profile-dropdown">
            <button className="profile-icon-btn">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#ffe6a0"/>
                <circle cx="18" cy="14" r="6" fill="#212a36"/>
                <ellipse cx="18" cy="27" rx="9" ry="5" fill="#212a36"/>
              </svg>
            </button>
            <div className="profile-dropdown-content">
              <button onClick={() => alert('Profile functionality coming soon!')}>Profile</button>
              <button onClick={() => alert('Settings functionality coming soon!')}>Settings</button>
              <button onClick={onLogout}>Logout</button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
