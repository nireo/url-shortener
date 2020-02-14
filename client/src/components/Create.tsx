import React, { useState, ChangeEvent } from 'react';
import { createLink } from '../services/link.service';
import { LinkResponse } from '../interfaces/Link';

export const Create: React.FC = () => {
  const [originalURL, setOriginalURL] = useState<string>('');
  const [created, setCreated] = useState<boolean>(false);
  const [recentURLs, setRecentURLs] = useState<string[]>([]);

  const create = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (originalURL === '') {
      return;
    }

    createLink(originalURL).then((response: LinkResponse) => {
      setCreated(true);
      setRecentURLs(recentURLs.concat(response.uuid));
    });
  };

  return (
    <div className="container">
      <div className="box">
        {created === false && (
          <form onSubmit={create}>
            <div>
              <input
                className="form-control"
                value={originalURL}
                onChange={({ target }) => setOriginalURL(target.value)}
                placeholder="Shorten your link"
                style={{ fontSize: '18px' }}
              />
              <button
                style={{ marginTop: '0.25rem' }}
                className="project-button"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        )}
        {created === true && (
          <div>
            <p>You have created url</p>
            <button onClick={() => setCreated(false)}>Create another</button>
          </div>
        )}
        {recentURLs.map(url => (
          <div>{url}</div>
        ))}
      </div>
    </div>
  );
};
