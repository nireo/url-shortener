import React, { useState, useEffect } from 'react';
import { User } from '../interfaces/User';
import { Create } from './Create';
import { Link } from 'react-router-dom';
import { getUserLinks } from '../services/link.service';

type Props = {
  user: User;
};

export const Panel: React.FC<Props> = ({ user }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageToRender, setPageToRender] = useState<number>(0);
  const [userLinks, setUserLinks] = useState<object[]>([]);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    if (user && pageToRender === 1 && !loaded) {
      getUserLinks()
        .then((response: any) => {
          setUserLinks(response);
        })
        .catch(() => {
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 4000);
        });
    }
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      {showNotification && (
        <div className="alert alert-danger" style={{ fontSize: '16px' }}>
          Username or password is incorrect.
        </div>
      )}
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
        {pageToRender === 1 && <div style={{ marginTop: '2rem' }}></div>}
      </div>
    </div>
  );
};
