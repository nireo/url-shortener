import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <p className="navbar-brand" style={{ fontSize: '20px' }}>
          benevol
        </p>
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
              <a
                className="nav-link"
                href="#about"
                style={{ fontSize: '18px' }}
              >
                login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
