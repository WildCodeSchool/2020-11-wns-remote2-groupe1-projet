import React, { useContext } from 'react';
import { NextPage } from 'next';
import { UserContext } from '../../Components/contexts/contexts';

const Account: NextPage = () => {
  const { me } = useContext(UserContext);

  return <p>{`Hello ${!me ? 'World' : me?.firstName}`}</p>;
};

export default Account;

// export default function index() {
//   return <div></div>;
// }
