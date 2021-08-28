import { useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/Contexts';
import { GET_RECENT_USERS } from '../../src/queries';
import { GetRecentUsers } from '../../src/schemaTypes';

function Dashboard() {
  const { currentUser } = useContext(UserContext);

  const { loading, data } = useQuery<GetRecentUsers>(GET_RECENT_USERS);

  return (
    <div>
      <h1>{`${currentUser?.firstName}'s dashboard`}</h1>
      <p>
        Name : <span>{currentUser.firstName}</span>{' '}
        <span>{currentUser.lastName}</span>
      </p>
      {loading ? '…' : data?.recentUsers}

      {/* <p>{currentUser.articles}</p> */}
    </div>
  );
}

export default Dashboard;
