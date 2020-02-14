import React from 'react';
import { Create } from './components/Create';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
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
        <Create />
      </div>
    </div>
  );
};

export default App;
