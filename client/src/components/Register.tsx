import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { User, UserWithToken } from '../interfaces/User';
import { register as serviceRegister } from '../services/user.service';
import { setToken as setLinkToken } from '../services/link.service';
import { setToken as setUserToken } from '../services/user.service';

type Props = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const Register: React.FC<Props> = ({ user, setUser }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);

  if (user) {
    return null;
  }

  const register = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirm) {
      return;
    }

    serviceRegister(username, password)
      .then((response: UserWithToken) => {
        setUser(response.user);

        setUserToken(response.token);
        setLinkToken(response.token);
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
        <h1>Register</h1>
        <form onSubmit={register}>
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
              type="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              style={{ fontSize: '16px' }}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '16px', marginBottom: '0' }}>
              Confirm Password
            </label>
            <input
              className="form-control"
              type="password"
              onChange={({ target }) => setConfirm(target.value)}
              value={confirm}
              style={{ fontSize: '16px' }}
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
