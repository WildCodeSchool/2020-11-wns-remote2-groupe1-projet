import React, { useContext } from 'react';
import { NextPage } from 'next';
import { UserContext } from '../../Components/AppProviders/UserContext';

const Account: NextPage = () => {
  const { me } = useContext(UserContext);
  console.log(me);

  return <p>{`Hello ${!me ? 'World' : me?.firstName}`}</p>;
};

export default Account;

// export default function index() {
//   return <div></div>;
// }
