import React, { useState } from 'react';
import { Create } from './components/Create';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { User } from './interfaces/User';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
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
      <Route
        path="/login"
        exact
        render={() => <Login user={user} setUser={setUser} />}
      />
      <Route
        path="/register"
        exact
        render={() => <Register user={user} setUser={setUser} />}
      />
    </Router>
  );
};

export default App;
