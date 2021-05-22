import React from 'react';
import { NextPage } from 'next';
import { useInAppUserProvider } from '../../Components/AppProviders/UserContext';

// const Account: NextPage = () => {
//   const { me } = useInAppUserProvider();

//   return <p>{`Hello ${!me ? 'World' : me?.firstName}`}</p>;
// };

// export default Account;

export default function index() {
  return <div></div>;
}
