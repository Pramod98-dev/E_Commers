import React from 'react';
import './Header.css';
import MsMobileLogo from '../assets/MsMobileLogo';

const Header = ({ onLoginClick, user, admin, onLogout, isAdmin, sidebarCollapsed }) => {
  // Adjust left margin if sidebar is present and not collapsed
  const headerStyle = isAdmin
    ? {
        marginLeft: sidebarCollapsed ? 60 : 220,
        transition: 'margin-left 0.2s',
        background: '#232f3e',
        color: '#fff',
        boxShadow: '0 2px 8px rgba(35,47,62,0.09)',
        zIndex: 101,
      }
    : {};
  return (
    <header className="header" style={headerStyle}>
      <div className="header__left">
        <MsMobileLogo className="header__logo" width={44} height={44} />
      </div>
      <nav className="header__nav">
        {isAdmin && (
          <div className="profile-dropdown">
            <button className="profile-icon-btn">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#febd69"/>
                <circle cx="18" cy="14" r="6" fill="#232f3e"/>
                <ellipse cx="18" cy="27" rx="9" ry="5" fill="#232f3e"/>
              </svg>
            </button>
            <div className="profile-dropdown-content">
              <button onClick={() => alert('Profile functionality coming soon!')}>Profile</button>
              <button onClick={() => alert('Settings functionality coming soon!')}>Settings</button>
              <button onClick={onLogout}>Logout</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
