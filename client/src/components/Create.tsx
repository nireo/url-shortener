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
    <div>
      <p>Input the URL you want to shorten</p>
      {created === false && (
        <form onSubmit={create}>
          <input
            value={originalURL}
            onChange={({ target }) => setOriginalURL(target.value)}
          />
          <button type="submit">Create</button>
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
  );
};
