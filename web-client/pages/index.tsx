/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import { NextPage } from 'next/types';
import Articles from '../Components/Articles/Articles';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chatter App </title>
      </Head>
      <main>
        <Articles />
      </main>
    </div>
  );
};

export default Home;
