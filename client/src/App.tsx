import React, { useState } from 'react';
import { Create } from './components/Create';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { User } from './interfaces/User';
import { Panel } from './components/Panel';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
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
        render={() =>
          !user ? (
            <Login user={user} setUser={setUser} />
          ) : (
            <Redirect to="panel" />
          )
        }
      />
      <Route
        path="/register"
        exact
        render={() =>
          !user ? (
            <Register user={user} setUser={setUser} />
          ) : (
            <Redirect to="/panel" />
          )
        }
      />
      <Route
        path="/panel"
        exact
        render={() => (user ? <Panel user={user} /> : <Redirect to="/login" />)}
      />
    </Router>
  );
};

export default App;
