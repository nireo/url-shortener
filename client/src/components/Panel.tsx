import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../interfaces/User';
import { Create } from './Create';

type Props = {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const Panel: React.FC<Props> = ({ user, setUser }) => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="box">
        <h1>Welcome {user.username}</h1>
        <div>
          <button
            className="project-button"
            onClick={() => setShowCreate(true)}
          >
            Create link
          </button>
          <button
            style={{ marginLeft: '0.5rem' }}
            onClick={() => setUser(null)}
            className="project-button"
          >
            Logout
          </button>
        </div>
        {showCreate && (
          <div style={{ marginTop: '1rem' }}>
            <Create panel={true} setShowCreate={setShowCreate} />
          </div>
        )}
      </div>
    </div>
  );
};
