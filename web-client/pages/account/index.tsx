import React from 'react';
import { NextPage } from 'next';
import Dashboard from '../../components/login/Dashboard';
import withAuth from '../../components/withAuth';

const Account: NextPage = () => {
  return <Dashboard />;
};

export default withAuth(Account);
