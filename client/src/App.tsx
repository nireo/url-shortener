import React, { useState, useEffect } from 'react';
import { Create } from './components/Create';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { User } from './interfaces/User';
import { Panel } from './components/Panel';
import { setToken as setUserToken } from './services/user.service';
import { setToken as setLinkToken } from './services/link.service';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (user === null && loaded === false) {
      const userInfo: string | null = localStorage.getItem('user');
      if (userInfo) {
        const userInfoJSON = JSON.parse(userInfo);
        setLinkToken(userInfoJSON.token);
        setUserToken(userInfoJSON.token);
        setUser(userInfoJSON.user);
      }
      setLoaded(true);
    }
  }, []);

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
              <Create user={user} />
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
        render={() =>
          user ? (
            <Panel setUser={setUser} user={user} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Router>
  );
};

export default App;
