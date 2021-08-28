import React, { useContext } from 'react';
import { UserContext } from '../../contexts/Contexts';

function Dashboard() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <div>
      <h1>{`${currentUser?.firstName}'s dashboard`}</h1>
      <p>
        Name : <span>{currentUser.firstName}</span>{' '}
        <span>{currentUser.lastName}</span>
      </p>
      {/* <p>{currentUser}</p> */}
    </div>
  );
}

export default Dashboard;
