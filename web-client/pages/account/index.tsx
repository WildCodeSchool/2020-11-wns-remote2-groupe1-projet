import React, { useContext } from 'react';
import { NextPage } from 'next';
import { UserContext } from '../../components/Contexts';
import LoginComponent from '../../components/login/Login';
import Dashboard from '../../components/login/Dashboard';

const Account: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <LoginComponent />;
  } else {
    return <Dashboard />;
  }
};

export default Account;
