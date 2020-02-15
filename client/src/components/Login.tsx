import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const login = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === '' || username === '') {
      return;
    }
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
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
            <button className="project-button">Login</button>
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
