/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import { NextPage } from 'next/types';
import Articles from '../Components/articles/Articles';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Welcome to Hell ! </title>
      </Head>
      <main>
        <Articles />
      </main>
    </div>
  );
};

export default Home;
