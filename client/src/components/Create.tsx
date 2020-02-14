import React, { useState, ChangeEvent } from 'react';
import { createLink } from '../services/link.service';

export const Create: React.FC = () => {
  const [originalURL, setOriginalURL] = useState<string>('');
  const [created, setCreated] = useState<boolean>(false);

  const create = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (originalURL === '') {
      return;
    }

    createLink(originalURL);
    setCreated(true);
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
        </div>
      )}
    </div>
  );
};
