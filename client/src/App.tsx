import React from 'react';
import { Create } from './components/Create';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Register } from './components/Register';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route
        path="/"
        exact
        render={() => (
          <div>
            <Welcome />
            <div style={{ marginTop: '6rem' }}>
              <Create />
            </div>
          </div>
        )}
      />
      <Route path="/login" exact render={() => <Login />} />
      <Route path="/register" exact render={() => <Register />} />
    </Router>
  );
};

export default App;
