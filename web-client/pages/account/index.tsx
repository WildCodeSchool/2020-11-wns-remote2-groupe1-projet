import React, { useContext } from 'react';
import { useRouter } from 'next/dist/client/router';
import { NextPage } from 'next';
import { useInAppUserProvider } from '../../Components/AppProviders/UserContext';

const Account: NextPage = () => {
  const me = useInAppUserProvider();
  const router = useRouter();
  return <p>{`Hello ${!me ? 'World' : me?.firstname}`}</p>;
};

export default Account;
