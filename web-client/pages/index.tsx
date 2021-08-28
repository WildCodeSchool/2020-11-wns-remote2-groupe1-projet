/* eslint-disable react/react-in-jsx-scope */
import React, { useContext } from 'react';
import LoginComponent from '../components/login/Login';

import Head from 'next/head';
import { NextPage } from 'next/types';
import Articles from '../components/articles/ArticleList';
import { UserContext } from '../contexts/Contexts';

const Home: NextPage = () => {
  const { currentUser } = useContext(UserContext);

  if (!me) {
    return <LoginComponent />;
  } else {
    return (
      <div>
        <Head>
          <title>Chatter App </title>
        </Head>
        <Articles />
      </div>
    );
  }
};

export default Home;
