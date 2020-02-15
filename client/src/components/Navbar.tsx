import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ fontSize: '20px' }}>
          benevol
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#services"
                style={{ fontSize: '18px' }}
              >
                shorten
              </a>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
                style={{ fontSize: '18px' }}
              >
                login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
