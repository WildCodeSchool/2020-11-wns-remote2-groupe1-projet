/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import { Typography } from '@material-ui/core';
import { NextPage } from 'next/types';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Welcome to Hell ! </title>
      </Head>
      <main>
        <Typography variant="h4">Main Page</Typography>
      </main>
    </div>
  );
};

export default Home;
