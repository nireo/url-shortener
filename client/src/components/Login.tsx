import React, { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import {
  login as serviceLogin,
  setToken as setUserToken
} from '../services/user.service';
import { setToken as setLinkToken } from '../services/link.service';
import { User, UserWithToken } from '../interfaces/User';

type Props = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const Login: React.FC<Props> = ({ user, setUser }) => {
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  const login = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === '' || username === '') {
      return;
    }

    serviceLogin(username, password)
      .then((response: UserWithToken) => {
        if (remember) {
          window.localStorage.setItem('user', JSON.stringify(response));
        }
        setLinkToken(response.token);
        setUserToken(response.token);
        setUser(response.user);
      })
      .catch(() => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);
      });
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {showNotification && (
        <div className="alert alert-danger" style={{ fontSize: '16px' }}>
          Username or password is incorrect.
        </div>
      )}
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={login}>
          <div>
            <label style={{ fontSize: '16px', marginBottom: '0' }}>
              Username
            </label>
            <input
              className="form-control"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
              style={{ fontSize: '16px' }}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '16px', marginBottom: '0' }}>
              Password
            </label>
            <input
              className="form-control"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              style={{ fontSize: '16px' }}
              type="password"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setRemember(!remember)}
            />
            <label style={{ fontSize: '16px' }} className="form-check-label">
              Remember me
            </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="project-button">
              Login
            </button>
            <Link
              style={{
                marginLeft: '0.5rem',
                color: '6eb6ff',
                fontSize: '16px',
                textDecoration: 'none'
              }}
              to="/register"
            >
              Don't have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
