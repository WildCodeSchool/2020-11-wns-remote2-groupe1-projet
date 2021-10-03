/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next/types';
import Articles from '../components/articles/ArticleList';
import withAuth from '../components/withAuth';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chatter App </title>
      </Head>
      <Articles />
    </div>
  );
};

export default withAuth(Home);
