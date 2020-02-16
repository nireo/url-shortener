import React, { useState } from 'react';
import { User } from '../interfaces/User';
import { Create } from './Create';
import { Link } from 'react-router-dom';

type Props = {
  user: User;
};

export const Panel: React.FC<Props> = ({ user }) => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [pageToRender, setPageToRender] = useState<number>(0);
  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="box">
        <h1>Welcome {user.username}</h1>
        <ul className="nav nav-tabs" style={{ fontSize: '16px' }}>
          <li className="nav-item">
            <Link
              to="/panel"
              onClick={() => setPageToRender(0)}
              className={`nav-link ${pageToRender === 0 ? 'active' : ''}`}
            >
              Create
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/panel"
              onClick={() => setPageToRender(1)}
              className={`nav-link ${pageToRender === 1 ? 'active' : ''}`}
            >
              Manage
            </Link>
          </li>
        </ul>
        {pageToRender === 0 && (
          <div style={{ marginTop: '2rem' }}>
            <Create panel={true} />
          </div>
        )}
      </div>
    </div>
  );
};
