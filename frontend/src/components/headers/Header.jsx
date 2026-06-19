import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '#', label: 'Turnos' },
  { to: '#', label: 'Cartilla' },
  { to: '#', label: 'Planes' },
  { to: '#', label: 'Sucursales' },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant">
      <div className="max-w-container-max mx-auto h-20 px-gutter flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded bg-primary text-on-primary font-extrabold text-xs flex items-center justify-center">
            SM
          </span>
          <span className="text-xl font-bold uppercase tracking-tight text-primary">Sweet Medical</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-lg transition-colors ${isActive? 'text-primary': 'text-text-secondary hover:text-primary'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;