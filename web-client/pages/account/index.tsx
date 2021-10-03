import React, { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { UserContext } from '../../contexts/Contexts';
import Dashboard from '../../components/login/Dashboard';
import { useRouter } from 'next/router';

const Account: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  const router = useRouter();

  // useEffect(() => {
  // if (!currentUser) {
  //  router.push(`/login`);
  //}
  //}, []);

  return <Dashboard />;
};

export default Account;
