import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { createLink, createAnonymous } from '../services/link.service';
import { LinkResponse } from '../interfaces/Link';
import { User } from '../interfaces/User';

type Props = {
  panel?: boolean;
  setShowCreate?: Dispatch<SetStateAction<boolean>>;
  user?: User;
};

export const Create: React.FC<Props> = ({ panel, setShowCreate, user }) => {
  const [originalURL, setOriginalURL] = useState<string>('');
  const [created, setCreated] = useState<boolean>(false);
  const [recentURLs, setRecentURLs] = useState<string>('');

  const create = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (originalURL === '') {
      return;
    }

    if (!user) {
      createLink(originalURL).then((response: LinkResponse) => {
        setCreated(true);
        setRecentURLs(response.uuid);
      });
    } else {
      createAnonymous(originalURL).then((response: LinkResponse) => {
        setCreated(true);
        setRecentURLs(response.uuid);
      });
    }
  };

  return (
    <div className="container">
      <div className="box">
        {created === false && (
          <form onSubmit={create}>
            {!panel && (
              <h3 style={{ marginBottom: '1rem' }}>Create link anonymously</h3>
            )}
            <div>
              <input
                className="form-control"
                value={originalURL}
                onChange={({ target }) => setOriginalURL(target.value)}
                placeholder="Shorten your link"
                style={{ fontSize: '16px' }}
              />
              <div>
                <button
                  style={{ marginTop: '0.5rem' }}
                  className="project-button"
                  type="submit"
                >
                  Create
                </button>
                {setShowCreate && (
                  <button
                    onClick={() => setShowCreate(false)}
                    style={{ marginLeft: '0.5rem' }}
                    className="project-button"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
        {created === true && (
          <div>
            <p style={{ fontSize: '16px' }}>
              Url has been successfully created
              {console.log(recentURLs)}
            </p>
            <div style={{ fontSize: '16px' }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`http://url.benevol.xyz/link/${recentURLs}`}
              >
                http://url.benevol.xyz/link/{recentURLs}
              </a>
            </div>
            <button
              className="project-button"
              onClick={() => {
                setCreated(false);
                setOriginalURL('');
              }}
            >
              Create another link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
