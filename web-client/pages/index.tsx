/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head';
import { NextPage } from 'next/types';
import Articles from '../Components/articles';
import Paper from '@material-ui/core/Paper';

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

export default Home;
