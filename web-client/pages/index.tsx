/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import Posts from '../components/posts/PostList';
import withAuth from '../components/withAuth';

const Home: NextPage = () => {
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
