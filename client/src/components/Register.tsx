import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const register = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirm) {
      return;
    }
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
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
