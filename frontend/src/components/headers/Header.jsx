import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = ({ usuario }) => {
  return (

    //{/* TopNavBar */}
      <header className="docked full-width top-0 sticky bg-surface dark:bg-bg-dark border-b border-outline-variant dark:border-secondary z-50 transition-all duration-200 ease-in-out">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-2">
            {/* Red square isotype */}
            <div className="w-8 h-8 bg-primary-container rounded-sm flex items-center justify-center text-white font-bold text-xs">SM</div>
            <Link to="/" className="font-h2-section-mobile md:font-h2-section text-h2-section-mobile md:text-h2-section text-primary dark:text-primary-container uppercase tracking-tight" href="#">SWISS MEDICAL</Link>
          </div>
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-primary p-2">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
          </button>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a className="font-body-main text-body-main text-primary dark:text-primary-container font-bold border-b-2 border-primary pb-1 hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Turnos</a>
            <a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Cartilla</a>
            <a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Planes</a>
            <a className="font-body-main text-body-main text-secondary dark:text-text-dark-mode hover:text-primary dark:hover:text-primary-container transition-colors" href="#">Sucursales</a>
          </nav>
        </div>
      </header>
  );
};

export default Header;