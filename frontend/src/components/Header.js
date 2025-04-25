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
        <span className="header__brand">Ms Mobile Admin</span>
      </div>
      <nav className="header__nav">
        {/* Removed Logout button globally as requested */}
      </nav>
    </header>
  );
};

export default Header;
