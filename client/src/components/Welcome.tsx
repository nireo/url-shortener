import React from 'react';
import { Link } from 'react-router-dom';

export const Welcome: React.FC = () => {
  return (
    <div className="container">
      <h1
        style={{
          fontSize: '48px',
          marginTop: '4rem',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        Create short links with ease!
        <div
          className="text-muted"
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '20px',
            fontWeight: 400
          }}
        >
          Make easily recognizable links, instead of long untrustworthy links.
        </div>
      </h1>
      <Link to="/login">
        <button className="project-button">Get started</button>
      </Link>
    </div>
  );
};
