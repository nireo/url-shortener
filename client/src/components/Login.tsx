import React, { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { login as serviceLogin } from '../services/user.service';
import { User } from '../interfaces/User';

type Props = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const Login: React.FC<Props> = ({ user, setUser }) => {
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const login = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === '' || username === '') {
      return;
    }

    serviceLogin(username, password)
      .then((response: User) => {
        setUser(response);
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
