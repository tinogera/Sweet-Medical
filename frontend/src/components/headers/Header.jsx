import React from 'react';
import './Header.css';

const Header = ({ usuario, children }) => {
  return (
    <header className="main-header">
      <div className="logo">Sweet Medical</div>
      <div className="header-right">
        <span className="user-greeting">
          {usuario ? `Buen día, ${usuario}` : 'Buen día'}
        </span>
        <nav>
          {children}
        </nav>
      </div>
    </header>
  );
};

export default Header;