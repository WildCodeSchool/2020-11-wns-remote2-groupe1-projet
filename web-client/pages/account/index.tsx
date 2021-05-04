import React from 'react';
import { NextPage } from 'next';
import {
  me,
  useInAppUserProvider,
} from '../../Components/AppProviders/UserContext';

const Account: NextPage = () => {
  const me = useInAppUserProvider();

  return <p>{`Hello ${!me ? 'World' : me?.firstname}`}</p>;
};

export default Account;
