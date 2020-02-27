import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { User } from '../interfaces/User';
import { Create } from './Create';
import { Link } from 'react-router-dom';
import {
  getUserLinks,
  deleteLink as sDeleteLink
} from '../services/link.service';
import { LinkResponse } from '../interfaces/Link';
import { removeUser } from '../services/user.service';

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const Panel: React.FC<Props> = ({ user, setUser }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageToRender, setPageToRender] = useState<number>(0);
  const [userLinks, setUserLinks] = useState<LinkResponse[] | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  useEffect(() => {
    if (user && pageToRender === 1 && loaded === false && userLinks === null) {
      getUserLinks()
        .then((response: any) => {
          setUserLinks(response);
          setLoaded(false);
        })
        .catch(() => {
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 4000);
        });
    }
  }, [pageToRender]);

  if (!user) {
    return null;
  }

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  };

  const deleteLink = (id: string) => {
    if (window.confirm('Delete link?')) {
      sDeleteLink(id);
    }
  };

  const deleteUser = () => {
    if (window.confirm('Are you sure you want delete your account?')) {
      removeUser();
      localStorage.clear();
      setUser(null);
    }
  };

  return (
    <div className="container">
      {showNotification && (
        <div className="alert alert-danger" style={{ fontSize: '16px' }}>
          Something went wrong.
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
          <li className="nav-item">
            <Link
              to="/panel"
              onClick={() => setPageToRender(2)}
              className={`nav-link ${pageToRender === 2 ? 'active' : ''}`}
            >
              Settings
            </Link>
          </li>
        </ul>
        {pageToRender === 0 && (
          <div style={{ marginTop: '2rem' }}>
            <Create panel={true} user={user} />
          </div>
        )}
        {pageToRender === 1 && (
          <div style={{ marginTop: '2rem' }}>
            {userLinks !== null && (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Original</th>
                    <th scope="col">Shortened</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userLinks.map((link: LinkResponse, index: number) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{link.original}</td>
                      <td>
                        <a href={`http://url.benevol.xyz/link/${link.uuid}`}>
                          http://url.benevol.xyz/link{link.uuid}
                        </a>
                      </td>
                      <td>{parseDate(link.created_at)}</td>
                      <td>
                        <button
                          style={{
                            fontSize: '12px',
                            padding: '0.4 1.5',
                            marginTop: '0',
                            marginBottom: '0'
                          }}
                          className="project-button"
                          onClick={() => deleteLink(link.uuid)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {pageToRender === 2 && (
          <div style={{ marginTop: '2rem' }}>
            <h2>Settings</h2>
            <button
              style={{ padding: '0.4rem 1.5rem' }}
              className="project-button"
              onClick={() => deleteUser()}
            >
              Delete user
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
