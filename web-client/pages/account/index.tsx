import React, { useContext } from 'react';
import { NextPage } from 'next';
import { UserContext } from '../../contexts/Contexts';
import LoginComponent from '../../components/login/Login';

const Account: NextPage = () => {
  const { me } = useContext(UserContext);

  if (!me) {
    return <LoginComponent />;
  } else {
    return <p>{`Hello ${me?.firstName}`}</p>;
  }
};

export default Account;

// export default function index() {
//   return <div></div>;
// }
