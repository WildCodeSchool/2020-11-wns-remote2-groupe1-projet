/* eslint-disable react/react-in-jsx-scope */
import React, { useContext } from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import Posts from '../components/posts/PostList';
import withAuth from '../components/withAuth';
import { UserContext } from '../contexts/Contexts';

const Home: NextPage = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <div>
      <Head>
        <title>Chatter App </title>
      </Head>
      <Posts />
    </div>
  );
};

export default withAuth(Home);
