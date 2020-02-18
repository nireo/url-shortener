import React, { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { createLink } from '../services/link.service';
import { LinkResponse } from '../interfaces/Link';

type Props = {
  panel?: boolean;
  setShowCreate?: Dispatch<SetStateAction<boolean>>;
};

export const Create: React.FC<Props> = ({ panel, setShowCreate }) => {
  const [originalURL, setOriginalURL] = useState<string>('');
  const [created, setCreated] = useState<boolean>(false);
  const [recentURLs, setRecentURLs] = useState<string>('');

  const create = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (originalURL === '') {
      return;
    }

    createLink(originalURL).then((response: LinkResponse) => {
      setCreated(true);
      setRecentURLs(response.uuid);
    });
  };

  return (
    <div className="container">
      <div className="box">
        {created === false && (
          <form onSubmit={create}>
            {!panel && (
              <h3 style={{ marginBottom: '1rem' }}>Quickly create link</h3>
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
              Create another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
